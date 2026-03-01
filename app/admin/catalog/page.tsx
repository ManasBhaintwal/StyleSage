"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { getTotalStock, normalizeStock } from "@/lib/stock-normalization";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
  stock: { [size: string]: number };
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_OPTIONS = ["collections", "anime", "meme", "custom"];

export default function AdminCatalogPage() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog states
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: [] as string[],
    stock: 0,
    isActive: true,
    isFeatured: false,
    sizes: "XS,S,M,L,XL,2XL,3XL,4XL,5XL",
    colors: "White,Black,Navy,Red,Green",
    tags: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === "admin") {
            setUser(data.user);
            loadData();
          } else {
            window.location.href =
              "/auth?callbackUrl=" +
              encodeURIComponent(window.location.pathname);
          }
        } else {
          window.location.href =
            "/auth?callbackUrl=" + encodeURIComponent(window.location.pathname);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href =
          "/auth?callbackUrl=" + encodeURIComponent(window.location.pathname);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products?admin=true");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const sizes = productForm.sizes.split(",").map((s) => s.trim());
      const productData = {
        name: productForm.name,
        slug: productForm.slug,
        description: productForm.description,
        price: productForm.price,
        originalPrice: productForm.originalPrice || undefined,
        images: ["/placeholder.svg?height=400&width=400"],
        sizes,
        colors: productForm.category.includes("custom")
          ? productForm.colors
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : [],
        tags: productForm.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category: productForm.category,
        stock: normalizeStock(productForm.stock, sizes),
        isActive: productForm.isActive,
        isFeatured: productForm.isFeatured,
        rating: 4.5,
        reviews: 0,
      };
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        const data = await res.json();
        setProducts([data.product, ...products]);
        setProductDialog(false);
        resetProductForm();
      } else {
        const err = await res.json();
        console.error("Failed to create product:", err.message);
        alert("Failed to create product: " + (err.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const sizes = productForm.sizes.split(",").map((s) => s.trim());
      const productData = {
        name: productForm.name,
        slug: productForm.slug,
        description: productForm.description,
        price: productForm.price,
        originalPrice: productForm.originalPrice || undefined,
        sizes,
        colors: productForm.category.includes("custom")
          ? productForm.colors
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : [],
        tags: productForm.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category: productForm.category,
        stock: normalizeStock(productForm.stock, sizes),
        isActive: productForm.isActive,
        isFeatured: productForm.isFeatured,
      };
      const res = await fetch(`/api/products/${editingProduct.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        await loadData();
        setProductDialog(false);
        resetProductForm();
        setEditingProduct(null);
      } else {
        const err = await res.json();
        console.error("Failed to update product:", err.message);
        alert("Failed to update product: " + (err.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = async (slug: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${slug}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setProducts(products.filter((prod) => prod.slug !== slug));
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      slug: "",
      description: "",
      price: 0,
      originalPrice: 0,
      category: [],
      stock: 0,
      isActive: true,
      isFeatured: false,
      sizes: "XS,S,M,L,XL,2XL,3XL,4XL,5XL",
      colors: "White,Black,Navy,Red,Green",
      tags: "",
    });
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      stock: getTotalStock(product.stock, product.sizes),
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
      tags: product.tags.join(","),
    });
    setProductDialog(true);
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You need admin access to view this page.
          </p>
        </div>
      </div>
    );
  }

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
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                Catalog Management
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Catalog Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage products in your catalog
          </p>
        </div>

        {/* Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products ({products.length})</CardTitle>
            <Dialog open={productDialog} onOpenChange={setProductDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetProductForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Create Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct
                      ? "Update product information"
                      : "Add a new product to your catalog"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName">Name</Label>
                      <Input
                        id="productName"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productSlug">Slug</Label>
                      <Input
                        id="productSlug"
                        value={productForm.slug}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            slug: e.target.value,
                          })
                        }
                        placeholder="product-slug"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="productDescription">Description</Label>
                    <Textarea
                      id="productDescription"
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Product description"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price (INR)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">
                        Original Price (INR)
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={productForm.originalPrice}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            originalPrice: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={productForm.stock}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            stock: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <div className="space-y-2">
                      {CATEGORY_OPTIONS.map((catId) => (
                        <div
                          key={catId}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`category-${catId}`}
                            checked={productForm.category.includes(catId)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProductForm({
                                  ...productForm,
                                  category: [...productForm.category, catId],
                                });
                              } else {
                                setProductForm({
                                  ...productForm,
                                  category: productForm.category.filter(
                                    (id) => id !== catId,
                                  ),
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`category-${catId}`}>
                            {catId.charAt(0).toUpperCase() + catId.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                    <Input
                      id="sizes"
                      value={productForm.sizes}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          sizes: e.target.value,
                        })
                      }
                      placeholder="XS,S,M,L,XL,2XL,3XL,4XL,5XL"
                    />
                  </div>
                  {productForm.category.includes("custom") && (
                    <div>
                      <Label htmlFor="colors">Colors (comma-separated)</Label>
                      <Input
                        id="colors"
                        value={productForm.colors}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            colors: e.target.value,
                          })
                        }
                        placeholder="White,Black,Navy,Red,Green"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={productForm.tags}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          tags: e.target.value,
                        })
                      }
                      placeholder="anime,naruto,manga"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="productActive"
                        checked={productForm.isActive}
                        onCheckedChange={(checked) =>
                          setProductForm({
                            ...productForm,
                            isActive: checked,
                          })
                        }
                      />
                      <Label htmlFor="productActive">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="productFeatured"
                        checked={productForm.isFeatured}
                        onCheckedChange={(checked) =>
                          setProductForm({
                            ...productForm,
                            isFeatured: checked,
                          })
                        }
                      />
                      <Label htmlFor="productFeatured">Featured</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProductDialog(false);
                      setEditingProduct(null);
                      resetProductForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={
                      editingProduct ? handleUpdateProduct : handleCreateProduct
                    }
                  >
                    {editingProduct ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {product.category.join(", ") || "Unknown"}
                    </TableCell>
                    <TableCell>&#8377;{product.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          getTotalStock(product.stock, product.sizes) > 0
                            ? "default"
                            : "destructive"
                        }
                      >
                        {getTotalStock(product.stock, product.sizes)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.isActive ? "default" : "secondary"}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.slug)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
