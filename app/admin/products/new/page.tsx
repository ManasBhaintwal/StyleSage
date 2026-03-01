"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function AddProductPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Basic state for form fields - could use react-hook-form for better validation later
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        originalPrice: "",
        description: "",
        images: "", // Comma separated for now
        tags: "",   // Comma separated
        category: "anime", // Default
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Process basic data
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
                tags: formData.tags.split(",").map(s => s.trim()).filter(Boolean),
                category: [formData.category], // Array format
                // Defaults for now
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: [{ id: "black", label: "Black", hex: "#000000" }],
                stock: { "S": 10, "M": 10, "L": 10, "XL": 10, "2XL": 10 }
            };

            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create product");

            toast({
                title: "Success",
                description: "Product created successfully!",
            });

            // Reset form
            setFormData({
                name: "", slug: "", price: "", originalPrice: "",
                description: "", images: "", tags: "", category: "anime"
            });

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not create product.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-display uppercase">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Naruto Hoodie" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required placeholder="e.g. naruto-hoodie" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="originalPrice">Original Price (₹)</Label>
                            <Input id="originalPrice" name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="images">Image URLs (Comma separated)</Label>
                        <Textarea id="images" name="images" value={formData.images} onChange={handleChange} required placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (Comma separated)</Label>
                            <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="trending, naruto, new" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                name="category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="anime">Anime</option>
                                <option value="meme">Meme</option>
                            </select>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Create Product
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
