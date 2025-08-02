"use client";

import { useEffect, useState } from "react";
import { getCategories, getNavbarConfig } from "@/lib/catalog";

export default function NavbarDebugPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [navbarConfig, setNavbarConfig] = useState<any>(null);

  useEffect(() => {
    const categoriesData = getCategories();
    const configData = getNavbarConfig();

    setCategories(categoriesData);
    setNavbarConfig(configData);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Navbar Debug Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(categories, null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Navbar Config</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(navbarConfig, null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Active Categories</h2>
        {navbarConfig && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(
              categories
                .filter(
                  (cat) =>
                    cat.isActive && navbarConfig.categories.includes(cat.id)
                )
                .sort((a, b) => a.order - b.order),
              null,
              2
            )}
          </pre>
        )}
      </div>
    </div>
  );
}
