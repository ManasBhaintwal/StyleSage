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
        // Failed to parse state parameter
      }
    }

    if (error) {
      const callbackPageUrl = new URL("/auth/callback/google", request.url);
      callbackPageUrl.searchParams.set("error", error);
      callbackPageUrl.searchParams.set("message", error);
      return NextResponse.redirect(callbackPageUrl);
    }

    if (!code) {
      const callbackPageUrl = new URL("/auth/callback/google", request.url);
      callbackPageUrl.searchParams.set("error", "no_code");
      callbackPageUrl.searchParams.set("message", "Missing authorization code");
      return NextResponse.redirect(callbackPageUrl);
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    // Check if user exists or create new user
    let user = await getUserByEmail(googleUser.email);

    if (!user) {
      // Create new user
      user = await createUser({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        role: "user",
        provider: "google",
        googleId: googleUser.id,
      });
    } else {
      // Update last login
      await updateUserLastLogin(user._id.toString());
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
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed";
    const callbackPageUrl = new URL("/auth/callback/google", request.url);
    callbackPageUrl.searchParams.set("error", "authentication_failed");
    callbackPageUrl.searchParams.set("message", errorMessage);
    return NextResponse.redirect(callbackPageUrl);
  }
}
