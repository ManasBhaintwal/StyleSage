"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Tags,
  Navigation,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import {
  getCategories,
  getProducts,
  getNavbarConfig,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  saveNavbarConfig,
  type Category,
  type Product,
  type NavbarConfig,
} from "@/lib/catalog";

export default function AdminCatalogPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog states
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
    order: 1,
  });

  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "",
    stock: 0,
    isActive: true,
    isFeatured: false,
    sizes: "XS,S,M,L,XL,2XL,3XL,4XL,5XL",
    colors: "White,Black,Navy,Red,Green",
    tags: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      setCategories(getCategories());
      setProducts(getProducts());
      setNavbarConfig(getNavbarConfig());
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = () => {
    try {
      const newCategory = createCategory(categoryForm);
      setCategories([...categories, newCategory]);
      setCategoryDialog(false);
      resetCategoryForm();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    try {
      const updated = updateCategory(editingCategory.id, categoryForm);
      if (updated) {
        setCategories(
          categories.map((cat) => (cat.id === updated.id ? updated : cat))
        );
        setCategoryDialog(false);
        resetCategoryForm();
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        if (deleteCategory(id)) {
          setCategories(categories.filter((cat) => cat.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  const handleCreateProduct = () => {
    try {
      const productData = {
        ...productForm,
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: productForm.sizes.split(",").map((s) => s.trim()),
        colors:
          productForm.category === "custom"
            ? productForm.colors
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            : [],
        tags: productForm.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        rating: 4.5,
        reviews: 0,
      };
      const newProduct = createProduct(productData);
      setProducts([...products, newProduct]);
      setProductDialog(false);
      resetProductForm();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    try {
      const productData = {
        ...productForm,
        sizes: productForm.sizes.split(",").map((s) => s.trim()),
        colors:
          productForm.category === "custom"
            ? productForm.colors
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            : [],
        tags: productForm.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const updated = updateProduct(editingProduct.id, productData);
      if (updated) {
        setProducts(
          products.map((prod) => (prod.id === updated.id ? updated : prod))
        );
        setProductDialog(false);
        resetProductForm();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        if (deleteProduct(id)) {
          setProducts(products.filter((prod) => prod.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleUpdateNavbar = () => {
    if (!navbarConfig) return;

    try {
      saveNavbarConfig(navbarConfig);
      alert("Navbar configuration updated successfully!");
    } catch (error) {
      console.error("Failed to update navbar:", error);
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      slug: "",
      description: "",
      isActive: true,
      order: categories.length + 1,
    });
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      slug: "",
      description: "",
      price: 0,
      originalPrice: 0,
      category: "",
      stock: 0,
      isActive: true,
      isFeatured: false,
      sizes: "XS,S,M,L,XL,2XL,3XL,4XL,5XL",
      colors: "White,Black,Navy,Red,Green",
      tags: "",
    });
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      isActive: category.isActive,
      order: category.order,
    });
    setCategoryDialog(true);
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
      stock: product.stock,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
      tags: product.tags.join(","),
    });
    setProductDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
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
            Manage categories, products, and navbar configuration
          </p>
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="categories"
              className="flex items-center space-x-2"
            >
              <Tags className="w-4 h-4" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex items-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="navbar" className="flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span>Navbar</span>
            </TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Categories ({categories.length})</CardTitle>
                <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={resetCategoryForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingCategory ? "Edit Category" : "Create Category"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingCategory
                          ? "Update category information"
                          : "Add a new category to your catalog"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={categoryForm.name}
                          onChange={(e) =>
                            setCategoryForm({
                              ...categoryForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Category name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={categoryForm.slug}
                          onChange={(e) =>
                            setCategoryForm({
                              ...categoryForm,
                              slug: e.target.value,
                            })
                          }
                          placeholder="category-slug"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={categoryForm.description}
                          onChange={(e) =>
                            setCategoryForm({
                              ...categoryForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Category description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="order">Order</Label>
                        <Input
                          id="order"
                          type="number"
                          value={categoryForm.order}
                          onChange={(e) =>
                            setCategoryForm({
                              ...categoryForm,
                              order: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={categoryForm.isActive}
                          onCheckedChange={(checked) =>
                            setCategoryForm({
                              ...categoryForm,
                              isActive: checked,
                            })
                          }
                        />
                        <Label htmlFor="isActive">Active</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCategoryDialog(false);
                          setEditingCategory(null);
                          resetCategoryForm();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={
                          editingCategory
                            ? handleUpdateCategory
                            : handleCreateCategory
                        }
                      >
                        {editingCategory ? "Update" : "Create"}
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
                      <TableHead>Slug</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>/{category.slug}</TableCell>
                        <TableCell>{category.order}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              category.isActive ? "default" : "secondary"
                            }
                          >
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditCategory(category)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}
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
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
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
                          <Label htmlFor="price">Price (₹)</Label>
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
                            Original Price (₹)
                          </Label>
                          <Input
                            id="originalPrice"
                            type="number"
                            step="0.01"
                            value={productForm.originalPrice}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                originalPrice: Number.parseFloat(
                                  e.target.value
                                ),
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
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={productForm.category}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
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
                      {productForm.category === "custom" && (
                        <div>
                          <Label htmlFor="colors">
                            Colors (comma-separated)
                          </Label>
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
                          editingProduct
                            ? handleUpdateProduct
                            : handleCreateProduct
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
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          {categories.find((cat) => cat.id === product.category)
                            ?.name || "Unknown"}
                        </TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.stock > 0 ? "default" : "destructive"
                            }
                          >
                            {product.stock}
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
                              onClick={() => handleDeleteProduct(product.id)}
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
          </TabsContent>

          {/* Navbar Tab */}
          <TabsContent value="navbar">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Navbar Configuration</CardTitle>
                <Button onClick={handleUpdateNavbar}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {navbarConfig && (
                  <>
                    <div>
                      <Label className="text-base font-semibold">
                        Active Categories
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select which categories appear in the navbar
                      </p>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              id={`navbar-${category.id}`}
                              checked={navbarConfig.categories.includes(
                                category.id
                              )}
                              onCheckedChange={(checked) => {
                                const updatedCategories = checked
                                  ? [...navbarConfig.categories, category.id]
                                  : navbarConfig.categories.filter(
                                      (id) => id !== category.id
                                    );
                                setNavbarConfig({
                                  ...navbarConfig,
                                  categories: updatedCategories,
                                });
                              }}
                            />
                            <Label htmlFor={`navbar-${category.id}`}>
                              {category.name}
                            </Label>
                            <Badge
                              variant={
                                category.isActive ? "default" : "secondary"
                              }
                            >
                              {category.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">
                        Custom Links
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Manage additional navbar links
                      </p>
                      <div className="space-y-2">
                        {navbarConfig.customLinks.map((link, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              checked={link.isActive}
                              onCheckedChange={(checked) => {
                                const updatedLinks = [
                                  ...navbarConfig.customLinks,
                                ];
                                updatedLinks[index] = {
                                  ...link,
                                  isActive: checked,
                                };
                                setNavbarConfig({
                                  ...navbarConfig,
                                  customLinks: updatedLinks,
                                });
                              }}
                            />
                            <Input
                              value={link.name}
                              onChange={(e) => {
                                const updatedLinks = [
                                  ...navbarConfig.customLinks,
                                ];
                                updatedLinks[index] = {
                                  ...link,
                                  name: e.target.value,
                                };
                                setNavbarConfig({
                                  ...navbarConfig,
                                  customLinks: updatedLinks,
                                });
                              }}
                              className="w-32"
                            />
                            <Input
                              value={link.href}
                              onChange={(e) => {
                                const updatedLinks = [
                                  ...navbarConfig.customLinks,
                                ];
                                updatedLinks[index] = {
                                  ...link,
                                  href: e.target.value,
                                };
                                setNavbarConfig({
                                  ...navbarConfig,
                                  customLinks: updatedLinks,
                                });
                              }}
                              className="w-32"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updatedLinks =
                                  navbarConfig.customLinks.filter(
                                    (_, i) => i !== index
                                  );
                                setNavbarConfig({
                                  ...navbarConfig,
                                  customLinks: updatedLinks,
                                });
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newLink = {
                              name: "New Link",
                              href: "/new-link",
                              isActive: true,
                            };
                            setNavbarConfig({
                              ...navbarConfig,
                              customLinks: [
                                ...navbarConfig.customLinks,
                                newLink,
                              ],
                            });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Custom Link
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
