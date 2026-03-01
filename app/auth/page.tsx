"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { DynamicNavbar } from "@/components/dynamic-navbar";

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get("mode");

  const [mode, setMode] = useState<"login" | "register">("login");

  // Sync state with URL param on mount/update
  useEffect(() => {
    if (modeParam === "register" || modeParam === "signup") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [modeParam]);

  const toggleMode = () => {
    const newMode = mode === "login" ? "register" : "login";
    setMode(newMode);

    // Update URL without full reload
    const newUrl = new URL(window.location.href);
    if (newMode === "register") {
      newUrl.searchParams.set("mode", "register");
    } else {
      newUrl.searchParams.delete("mode");
    }
    router.replace(newUrl.pathname + newUrl.search);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DynamicNavbar />
      <div className="flex-1 grid lg:grid-cols-2">
        {/* Left: Brand Visual */}
        <div className="hidden lg:flex relative bg-surface items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

          <div className="relative z-10 text-center space-y-6">
            <h1 className="font-heading text-6xl font-bold">
              JOIN THE <br /> <span className="text-primary">CULTURE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Get early access to drops, exclusive discounts, and member-only custom designs.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center p-6 md:p-12 bg-background">
          <div className="w-full max-w-md">
            <div className="text-center lg:text-left mb-8">
              <Link href="/" className="font-heading text-2xl font-bold tracking-tighter">
                STYLE<span className="text-primary">SAGE</span>
              </Link>
            </div>

            {mode === "login" ? (
              <LoginForm onToggleForm={toggleMode} />
            ) : (
              <SignupForm onToggleForm={toggleMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
