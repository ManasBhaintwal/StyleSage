"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCategories, getNavbarConfig, type Category, type NavbarConfig } from "@/lib/catalog"

interface DynamicNavbarProps {
  currentPath?: string
}

export function DynamicNavbar({ currentPath = "" }: DynamicNavbarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNavbarData = () => {
      try {
        const categoriesData = getCategories()
        const configData = getNavbarConfig()

        setCategories(categoriesData)
        setNavbarConfig(configData)
      } catch (error) {
        console.error("Failed to load navbar data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNavbarData()

    // Listen for storage changes to update navbar in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "stylesage_categories" || e.key === "stylesage_navbar") {
        loadNavbarData()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  if (isLoading) {
    return (
      <nav className="hidden md:flex space-x-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </nav>
    )
  }

  if (!navbarConfig) return null

  // Get active categories in order
  const activeCategories = categories
    .filter((cat) => cat.isActive && navbarConfig.categories.includes(cat.id))
    .sort((a, b) => a.order - b.order)

  return (
    <nav className="hidden md:flex space-x-8">
      {activeCategories.map((category) => (
        <Link
          key={category.id}
          href={`/${category.slug}`}
          className={`transition-colors ${
            currentPath === `/${category.slug}`
              ? "text-gray-900 dark:text-white font-medium border-b-2 border-blue-500"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          {category.name}
        </Link>
      ))}

      {navbarConfig.customLinks
        .filter((link) => link.isActive)
        .map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              currentPath === link.href
                ? "text-gray-900 dark:text-white font-medium border-b-2 border-purple-500"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
    </nav>
  )
}
