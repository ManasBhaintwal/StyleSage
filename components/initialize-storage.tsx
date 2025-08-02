"use client";

import { useEffect } from "react";
import {
  getCategories,
  getNavbarConfig,
  saveCategories,
  saveNavbarConfig,
} from "@/lib/catalog";

export function InitializeLocalStorage() {
  useEffect(() => {
    // Force initialization of localStorage with defaults
    const categories = getCategories();
    const navbarConfig = getNavbarConfig();

    // Save them to ensure localStorage is initialized
    saveCategories(categories);
    saveNavbarConfig(navbarConfig);

    console.log("Initialized localStorage with categories:", categories);
    console.log("Initialized localStorage with navbar config:", navbarConfig);
  }, []);

  return null;
}
