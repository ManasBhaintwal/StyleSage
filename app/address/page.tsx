"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddressPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const handlePayment = () => {
    if (address.trim() === "") {
      alert("Please enter your address.");
      return;
    }
    router.push("/payment");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        className="w-1/2 p-2 border rounded mb-4"
      />
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
