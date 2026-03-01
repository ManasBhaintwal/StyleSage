"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function NavbarCMS() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    // Simple structure: just a raw JSON editor for now for flexibility, or a list of links
    const [jsonContent, setJsonContent] = useState("");

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/config/navbar`);
            if (res.ok) {
                const data = await res.json();
                if (data.config) {
                    setJsonContent(JSON.stringify(data.config.content, null, 2));
                } else {
                    // Default structure placeholder
                    setJsonContent(JSON.stringify([
                        { label: "New Drops", href: "/new-drops" },
                        { label: "Anime", href: "/anime" },
                        { label: "Meme", href: "/meme" },
                        { label: "Custom Lab", href: "/custom" }
                    ], null, 2));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Validate JSON
            const content = JSON.parse(jsonContent);

            const res = await fetch(`/api/config/navbar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: 'navbar', content }),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast({ title: "Saved!", description: "Navbar updated successfully." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Invalid JSON or Save Failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-display uppercase">Navbar Manager</h1>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Menu Configuration (JSON)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Edit the navigation links structure directly. Ensure it follows the format: <code>[{`{ "label": "Name", "href": "/link" }`}]</code>
                    </p>
                    <Textarea
                        className="font-mono h-[500px]"
                        value={jsonContent}
                        onChange={(e) => setJsonContent(e.target.value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
