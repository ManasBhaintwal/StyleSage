"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  X,
  ArrowLeft,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  address: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
  };
  payment: {
    amount: number;
    currency: string;
    status: string;
  };
  orderStatus: string;
  total: number;
  createdAt: string;
}

const statusConfig = {
  placed: {
    icon: Clock,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    label: "Placed",
  },
  confirmed: {
    icon: CheckCircle,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    label: "Confirmed",
  },
  shipped: {
    icon: Truck,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    label: "Shipped",
  },
  delivered: {
    icon: Package,
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    label: "Delivered",
  },
  cancelled: {
    icon: X,
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    label: "Cancelled",
  },
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchOrders(parsedUser.id);
  }, [router]);

  const fetchOrders = async (userId: string) => {
    try {
      const response = await fetch(`/api/orders?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders:", data.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Orders
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-center">
            <CardContent className="p-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here.
              </p>
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const StatusIcon =
                statusConfig[order.orderStatus as keyof typeof statusConfig]
                  ?.icon || Clock;
              const statusColor =
                statusConfig[order.orderStatus as keyof typeof statusConfig]
                  ?.color || statusConfig.placed.color;
              const statusLabel =
                statusConfig[order.orderStatus as keyof typeof statusConfig]
                  ?.label || "Unknown";

              return (
                <Card
                  key={order._id}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          Order {order.orderId}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={`${statusColor} flex items-center space-x-1`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusLabel}</span>
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            ₹{order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Items Ordered
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md flex-shrink-0">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Size: {item.size} • Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        Delivery Address
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.address.fullName}
                        </p>
                        <p>{order.address.addressLine1}</p>
                        {order.address.addressLine2 && (
                          <p>{order.address.addressLine2}</p>
                        )}
                        <p>
                          {order.address.city}, {order.address.state} -{" "}
                          {order.address.pinCode}
                        </p>
                        <p>Phone: {order.address.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
