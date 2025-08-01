"use client";

import React from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, currency: "INR" }),
      });

      const data = await response.json();

      if (data.success) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "T-Shirt Store",
          description: "Order Payment",
          order_id: data.order.id,
          handler: function (response: any) {
            alert("Payment Successful");
            router.push("/orders");
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Pay Now
      </button>
    </div>
  );
}
