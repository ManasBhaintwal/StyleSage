"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  onLogin?: () => void; // Callback for successful login
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  onLogin,
}: {
  children: React.ReactNode;
  onLogin?: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } else {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Login failed");
    }

    const data = await response.json();
    setUser(data.user);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // Trigger cart migration callback
    if (onLogin) {
      onLogin();
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isLoading: true,
          login,
          logout,
          checkAuth,
          onLogin,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, checkAuth, onLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
