"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Section {
    id: string;
    title: string;
    tags: string[];
}

interface CollectionConfig {
    _id?: string;
    slug: string;
    title: string;
    description: string;
    sections: Section[];
}

export default function CollectionsCMS() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("anime");
    const [config, setConfig] = useState<CollectionConfig>({
        slug: "anime",
        title: "",
        description: "",
        sections: []
    });

    useEffect(() => {
        fetchConfig(activeTab);
    }, [activeTab]);

    const fetchConfig = async (slug: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/collections/${slug}`);
            if (res.ok) {
                const data = await res.json();
                if (data.config) {
                    setConfig(data.config);
                } else {
                    // Reset to defaults if not found
                    setConfig({
                        slug,
                        title: slug === 'anime' ? 'Anime Collection' : 'Meme Collection',
                        description: `Best ${slug} merch`,
                        sections: []
                    });
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
            const res = await fetch(`/api/collections/${config.slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast({ title: "Saved!", description: "Collection updated successfully." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Could not save changes." });
        } finally {
            setLoading(false);
        }
    };

    const addSection = () => {
        const newId = `section-${Date.now()}`;
        setConfig({
            ...config,
            sections: [...config.sections, { id: newId, title: "New Section", tags: [] }]
        });
    };

    const updateSection = (index: number, field: keyof Section, value: any) => {
        const newSections = [...config.sections];
        if (field === 'tags') {
            // value comes in as comma separated string
            newSections[index].tags = value.split(',').map((t: string) => t.trim()).filter(Boolean);
        } else {
            // @ts-ignore
            newSections[index][field] = value;
        }
        setConfig({ ...config, sections: newSections });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-display uppercase">Collection Manager</h1>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="anime">Anime Page</TabsTrigger>
                    <TabsTrigger value="meme">Meme Page</TabsTrigger>
                </TabsList>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Page Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Page Title</Label>
                        <Input value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Input value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Carousel Sections</h2>
                    <Button variant="outline" size="sm" onClick={addSection}><Plus className="w-4 h-4 mr-2" /> Add Section</Button>
                </div>

                {config.sections.map((section, idx) => (
                    <Card key={section.id}>
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Section Title</Label>
                                    <Input
                                        value={section.title}
                                        onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Filter Tags (comma separated)</Label>
                                    <Input
                                        value={section.tags.join(', ')}
                                        onChange={(e) => updateSection(idx, 'tags', e.target.value)}
                                        placeholder="e.g. naruto, trending"
                                    />
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="mt-4"
                                onClick={() => {
                                    const newSections = config.sections.filter((_, i) => i !== idx);
                                    setConfig({ ...config, sections: newSections });
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Remove Section
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
