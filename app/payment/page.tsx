"use client";

import { useRouter } from "next/navigation";

// Declare Razorpay type for window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const router = useRouter();

  const handlePayment = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: 50000, // Example amount in paise (₹500)
      currency: "INR",
      name: "T-Shirt Store",
      description: "Purchase Description",
      handler: function (response: any) {
        alert("Payment Successful");
        router.push("/success");
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Pay Now
      </button>
    </div>
  );
}
