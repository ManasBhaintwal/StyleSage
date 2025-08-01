"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleTrackOrder = (orderId: number) => {
    alert(`Tracking order: ${orderId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <ul className="mb-4">
        <li className="mb-2">
          Order #1 - Delivered - ₹500
          <button
            onClick={() => handleTrackOrder(1)}
            className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Track
          </button>
        </li>
        <li className="mb-2">
          Order #2 - Processing - ₹1200
          <button
            onClick={() => handleTrackOrder(2)}
            className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Track
          </button>
        </li>
      </ul>
      <button
        onClick={handleContinueShopping}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrdersPage;
