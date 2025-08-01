"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DebugInfo {
  localStorage: any;
  serverAuth: any;
  cookies: string;
  env: any;
}

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDebugInfo = async () => {
    setIsLoading(true);
    try {
      const info: DebugInfo = {
        localStorage: null,
        serverAuth: null,
        cookies: document.cookie,
        env: null,
      };

      // Check localStorage
      try {
        const userData = localStorage.getItem("user");
        info.localStorage = userData ? JSON.parse(userData) : null;
      } catch (e) {
        info.localStorage = {
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }

      // Check server auth
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          info.serverAuth = await response.json();
        } else {
          info.serverAuth = { error: `Status: ${response.status}` };
        }
      } catch (e) {
        info.serverAuth = {
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }

      // Check environment
      try {
        const envResponse = await fetch("/api/test-env");
        if (envResponse.ok) {
          info.env = await envResponse.json();
        }
      } catch (e) {
        info.env = { error: e instanceof Error ? e.message : "Unknown error" };
      }

      setDebugInfo(info);
    } catch (error) {
      console.error("Debug error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    loadDebugInfo();
  };

  useEffect(() => {
    loadDebugInfo();
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading debug info...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={loadDebugInfo}>Refresh</Button>
            <Button variant="destructive" onClick={clearData}>
              Clear Local Data
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">localStorage Data:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(debugInfo?.localStorage, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Server Authentication:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(debugInfo?.serverAuth, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Cookies:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {debugInfo?.cookies || "No cookies"}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Environment:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(debugInfo?.env, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
