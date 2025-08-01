"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { getGoogleOAuthURL, isGoogleOAuthConfigured } from "@/lib/google-oauth";

interface AuthState {
  localStorage: any;
  serverAuth: any;
  cookies: string;
}

interface ConfigStatus {
  isConfigured: boolean;
  clientId: string;
  redirectUri: string;
  appUrl: string;
}

export default function TestAuthPage() {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [configStatus, setConfigStatus] = useState<ConfigStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = async () => {
    setIsLoading(true);
    try {
      const state: AuthState = {
        localStorage: null,
        serverAuth: null,
        cookies: document.cookie,
      };

      // Check localStorage
      try {
        const userData = localStorage.getItem("user");
        const authToken = localStorage.getItem("auth_token");
        state.localStorage = {
          user: userData ? JSON.parse(userData) : null,
          auth_token: authToken,
        };
      } catch (e) {
        state.localStorage = {
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }

      // Check server auth
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          state.serverAuth = await response.json();
        } else {
          state.serverAuth = {
            error: `Status: ${response.status}`,
            statusText: response.statusText,
          };
        }
      } catch (e) {
        state.serverAuth = {
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }

      setAuthState(state);
    } catch (error) {
      console.error("Auth state check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkGoogleOAuthConfig = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";

    setConfigStatus({
      isConfigured: isGoogleOAuthConfigured(),
      clientId,
      redirectUri,
      appUrl,
    });
  };

  const handleTestGoogleAuth = () => {
    try {
      const googleURL = getGoogleOAuthURL("/test-auth");
      console.log("Generated Google OAuth URL:", googleURL);
      window.location.href = googleURL;
    } catch (error) {
      console.error("Failed to generate Google OAuth URL:", error);
      alert("Failed to generate Google OAuth URL. Check console for details.");
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    checkAuthState();
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
    }
  };

  useEffect(() => {
    checkAuthState();
    checkGoogleOAuthConfig();
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading auth state...</div>;
  }

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Authentication State Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google OAuth Configuration Section */}
          <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Google OAuth Configuration
            </h3>
            {configStatus && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {configStatus.isConfigured ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="font-medium">OAuth Configuration:</span>
                  <span
                    className={
                      configStatus.isConfigured
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {configStatus.isConfigured
                      ? "Configured"
                      : "Not Configured"}
                  </span>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-md space-y-2 text-sm">
                  <div>
                    <strong>Client ID:</strong>{" "}
                    {configStatus.clientId || "Not set"}
                  </div>
                  <div>
                    <strong>Redirect URI:</strong>{" "}
                    {configStatus.redirectUri || "Not set"}
                  </div>
                  <div>
                    <strong>App URL:</strong> {configStatus.appUrl || "Not set"}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm">
                  <div className="font-medium mb-1">
                    Expected Google Cloud Console Configuration:
                  </div>
                  <div className="text-xs">
                    <strong>Authorized redirect URI should be exactly:</strong>
                  </div>
                  <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded border text-blue-800 dark:text-blue-200 text-xs block mt-1">
                    {configStatus.redirectUri ||
                      "http://localhost:3000/api/auth/callback/google"}
                  </code>
                </div>

                {configStatus.isConfigured && (
                  <div className="pt-2">
                    <Button
                      onClick={handleTestGoogleAuth}
                      className="w-full"
                      size="sm"
                    >
                      Test Google OAuth Flow
                    </Button>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      This will redirect you to Google's OAuth page. If you get
                      "redirect_uri_mismatch", the redirect URI in Google Cloud
                      Console doesn't match the one above.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Existing Auth State Testing Section */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button onClick={checkAuthState}>Refresh</Button>
              <Button variant="destructive" onClick={clearAuthData}>
                Clear Local Data
              </Button>
              <Button variant="outline" onClick={logout}>
                Full Logout
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">localStorage Data:</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(authState?.localStorage, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Server Authentication:</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(authState?.serverAuth, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cookies:</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto">
                {authState?.cookies || "No cookies"}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Expected OAuth Flow:
              </h4>
              <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>1. Click "Continue with Google" on /auth page</li>
                <li>2. Get redirected to Google OAuth</li>
                <li>
                  3. After approval, redirect to /api/auth/callback/google
                </li>
                <li>
                  4. Server sets auth_token cookie and redirects to homepage
                </li>
                <li>
                  5. HomePage UserMenu should detect auth and show profile
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
