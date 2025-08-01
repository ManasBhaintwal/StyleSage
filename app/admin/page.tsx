"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";

interface User {
  role: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need admin privileges to access this page.
            </p>
            <div className="space-y-3">
              <Link href="/auth">
                <Button className="w-full">Sign In as Admin</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Go Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: "₹37,48,571",
      change: "+20.1%",
      icon: <DollarSign className="h-4 w-4" />,
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+15.3%",
      icon: <ShoppingBag className="h-4 w-4" />,
      color: "text-blue-600",
    },
    {
      title: "Customers",
      value: "892",
      change: "+8.2%",
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600",
    },
    {
      title: "Products",
      value: "156",
      change: "+2.4%",
      icon: <Package className="h-4 w-4" />,
      color: "text-orange-600",
    },
  ];

  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      product: "Naruto Hokage Dreams",
      amount: "₹3,984",
      status: "Completed",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      product: "Custom Anime Design",
      amount: "₹4,565",
      status: "Processing",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      product: "Doge Meme Tee",
      amount: "₹3,652",
      status: "Shipped",
    },
    {
      id: "#1237",
      customer: "Sarah Wilson",
      product: "Attack on Titan Wings",
      amount: "₹4,316",
      status: "Pending",
    },
  ];

  const topProducts = [
    {
      name: "Naruto Hokage Dreams",
      sales: 234,
      revenue: "₹9,32,264",
      rating: 4.9,
    },
    { name: "This is Fine Dog", sales: 189, revenue: "₹7,37,289", rating: 4.8 },
    { name: "Custom Designs", sales: 156, revenue: "₹7,12,140", rating: 4.7 },
    {
      name: "Drake Pointing Meme",
      sales: 134,
      revenue: "₹5,11,612",
      rating: 4.6,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                StyleSage
              </Link>
              <Badge
                variant="secondary"
                className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              >
                Admin Panel
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with StyleSage today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {order.id}
                        </span>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Processing"
                              ? "secondary"
                              : order.status === "Shipped"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {order.product}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {order.amount}
                      </p>
                      <div className="flex space-x-1 mt-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.sales} sales
                        </span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {product.revenue}
                      </p>
                      <div className="flex space-x-1 mt-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/products">
                <Button
                  variant="outline"
                  className="h-20 flex-col bg-transparent w-full"
                >
                  <Package className="h-6 w-6 mb-2" />
                  Manage Products
                </Button>
              </Link>
              <Link href="/admin/catalog">
                <Button
                  variant="outline"
                  className="h-20 flex-col bg-transparent w-full"
                >
                  <Plus className="h-6 w-6 mb-2" />
                  Manage Catalog
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <ShoppingBag className="h-6 w-6 mb-2" />
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
