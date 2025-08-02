"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const [countdown, setCountdown] = useState(5);

  const isFailure = status === "failed";

  useEffect(() => {
    if (isFailure) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/cart");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [router, isFailure]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                StyleSage
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-center">
          <CardContent className="p-8">
            {isFailure ? (
              <>
                <div className="flex justify-center mb-6">
                  <XCircle className="w-16 h-16 text-red-500" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Payment Failed
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We're sorry, but your payment could not be processed. Please
                  try again.
                </p>

                {orderId && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        Order ID: {orderId}
                      </p>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      This order has been marked as failed. You can try placing
                      the order again.
                    </p>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Common reasons for payment failure:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Insufficient funds in your account</li>
                    <li>• Network connectivity issues</li>
                    <li>• Bank server maintenance</li>
                    <li>• Payment method restrictions</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Redirecting to cart in {countdown} seconds...
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/checkout">
                      <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    </Link>

                    <Link href="/cart">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Payment Status
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Checking payment status...
                </p>
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mt-4"></div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
