import { type NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getGoogleUserInfo } from "@/lib/google-oauth";
import {
  createUser,
  getUserByEmail,
  updateUserLastLogin,
  createJWT,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    let callbackUrl = "/";
    if (state) {
      try {
        const parsed = JSON.parse(Buffer.from(state, "base64").toString());
        if (parsed.callbackUrl && typeof parsed.callbackUrl === "string") {
          callbackUrl = parsed.callbackUrl;
        }
      } catch (e) {
        console.warn("Failed to parse state parameter:", e);
      }
    }

    console.log("OAuth callback received:", {
      hasState: !!state,
      hasCode: !!code,
      error,
      callbackUrl,
    });

    if (error) {
      console.error("OAuth error:", error);
      const callbackPageUrl = new URL("/auth/callback/google", request.url);
      callbackPageUrl.searchParams.set("error", error);
      callbackPageUrl.searchParams.set("message", error);
      return NextResponse.redirect(callbackPageUrl);
    }

    if (!code) {
      console.error("Missing authorization code");
      const callbackPageUrl = new URL("/auth/callback/google", request.url);
      callbackPageUrl.searchParams.set("error", "no_code");
      callbackPageUrl.searchParams.set("message", "Missing authorization code");
      return NextResponse.redirect(callbackPageUrl);
    }

    // Exchange code for tokens
    console.log("Exchanging authorization code for tokens...");
    const tokens = await exchangeCodeForTokens(code);

    // Get user info from Google
    console.log("Fetching user information from Google...");
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    // Check if user exists or create new user
    console.log("Setting up user account...");
    let user = await getUserByEmail(googleUser.email);

    if (!user) {
      // Create new user
      user = await createUser({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        role: googleUser.email === "admin@stylesage.com" ? "admin" : "user",
        provider: "google",
        googleId: googleUser.id,
      });
      console.log("Created new user:", user.email);
    } else {
      // Update last login
      await updateUserLastLogin(user._id.toString());
      console.log("Updated existing user login:", user.email);
    }

    // Create JWT token
    const token = await createJWT(user);

    // Determine redirect URL
    let redirectUrl = callbackUrl;
    if (
      user.role === "admin" &&
      (redirectUrl === "/" || redirectUrl === "/auth")
    ) {
      redirectUrl = "/admin";
    }
    if (!redirectUrl || redirectUrl === "/auth") {
      redirectUrl = "/";
    }

    console.log("Redirecting to:", redirectUrl);

    // Redirect to the client-side callback page with success parameters
    const callbackPageUrl = new URL("/auth/callback/google", request.url);
    callbackPageUrl.searchParams.set("auth", "success");
    callbackPageUrl.searchParams.set("callbackUrl", redirectUrl);

    // Create response with redirect to callback page
    const response = NextResponse.redirect(callbackPageUrl);

    // Set authentication cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed";
    const callbackPageUrl = new URL("/auth/callback/google", request.url);
    callbackPageUrl.searchParams.set("error", "authentication_failed");
    callbackPageUrl.searchParams.set("message", errorMessage);
    return NextResponse.redirect(callbackPageUrl);
  }
}
