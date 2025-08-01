import fetch from "node-fetch";

// Google OAuth configuration
export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  redirectUri:
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
  scope: "openid email profile",
  responseType: "code",
  accessType: "offline",
  prompt: "consent",
};

// Google OAuth URLs
export const GOOGLE_OAUTH_URLS = {
  authorize: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  userInfo: "https://www.googleapis.com/oauth2/v2/userinfo",
};

// Generate Google OAuth URL
export function getGoogleOAuthURL(callbackUrl?: string): string {
  const stateObj = {
    csrf: generateState(),
    callbackUrl: callbackUrl || "/",
  };
  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    scope: GOOGLE_OAUTH_CONFIG.scope,
    response_type: GOOGLE_OAUTH_CONFIG.responseType,
    access_type: GOOGLE_OAUTH_CONFIG.accessType,
    prompt: GOOGLE_OAUTH_CONFIG.prompt,
    state: btoa(JSON.stringify(stateObj)),
  });
  return `${GOOGLE_OAUTH_URLS.authorize}?${params.toString()}`;
}

// Generate random state for CSRF protection
function generateState(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Check if Google OAuth is configured
export function isGoogleOAuthConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  );
}

// Exchange authorization code for access token (server-side only)
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}> {
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  console.log("Google OAuth Debug Info:");
  console.log("- Client ID configured:", !!clientId);
  console.log("- Client Secret configured:", !!clientSecret);
  console.log("- Redirect URI:", redirectUri);
  console.log("- Authorization code received:", !!code);

  if (!clientSecret) {
    console.error("GOOGLE_CLIENT_SECRET environment variable is not set");
    throw new Error("Google Client Secret not configured");
  }

  if (!clientId) {
    console.error(
      "NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable is not set"
    );
    throw new Error("Google Client ID not configured");
  }

  if (!redirectUri) {
    console.error(
      "NEXT_PUBLIC_GOOGLE_REDIRECT_URI environment variable is not set"
    );
    throw new Error("Google Redirect URI not configured");
  }

  const response = await fetch(GOOGLE_OAUTH_URLS.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to exchange code for tokens: ${errorData}`);
  }

  return response.json();
}

// Get user info from Google
export async function getGoogleUserInfo(accessToken: string): Promise<{
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}> {
  const response = await fetch(
    `${GOOGLE_OAUTH_URLS.userInfo}?access_token=${accessToken}`
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to get user info from Google: ${errorData}`);
  }

  return response.json();
}

// Verify Google OAuth by exchanging code for tokens and fetching user info
export async function verifyGoogleOAuth(code: string): Promise<any> {
  try {
    // Exchange code for tokens
    const tokenResponse = await exchangeCodeForTokens(code);

    // Fetch user info using the access token
    const userInfoResponse = await fetch(GOOGLE_OAUTH_URLS.userInfo, {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userInfo = await userInfoResponse.json();
    return userInfo;
  } catch (error) {
    console.error("Error verifying Google OAuth:", error);
    throw error;
  }
}
