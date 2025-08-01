export interface Category {
  id: string
  name: string
  slug: string
  description: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  tags: string[]
  sizes: string[]
  colors: string[]
  stock: number
  isActive: boolean
  isFeatured: boolean
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

export interface NavbarConfig {
  id: string
  categories: string[]
  customLinks: Array<{
    name: string
    href: string
    isActive: boolean
  }>
  updatedAt: Date
}

// Default categories
const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "collections",
    name: "Collections",
    slug: "collections",
    description: "Our curated collections",
    isActive: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "anime",
    name: "Anime",
    slug: "anime",
    description: "Anime-inspired designs",
    isActive: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "meme",
    name: "Meme",
    slug: "meme",
    description: "Internet meme designs",
    isActive: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "custom",
    name: "Custom",
    slug: "custom",
    description: "Create your own design",
    isActive: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Storage functions (replace with real database in production)
export function getCategories(): Category[] {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES
  const stored = localStorage.getItem("stylesage_categories")
  return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES
}

export function saveCategories(categories: Category[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("stylesage_categories", JSON.stringify(categories))
}

export function getProducts(): Product[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("stylesage_products")
  return stored ? JSON.parse(stored) : []
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("stylesage_products", JSON.stringify(products))
}

export function getNavbarConfig(): NavbarConfig {
  if (typeof window === "undefined") {
    return {
      id: "default",
      categories: ["collections", "anime", "meme", "custom"],
      customLinks: [{ name: "About", href: "/about", isActive: true }],
      updatedAt: new Date(),
    }
  }

  const stored = localStorage.getItem("stylesage_navbar")
  return stored
    ? JSON.parse(stored)
    : {
        id: "default",
        categories: ["collections", "anime", "meme", "custom"],
        customLinks: [{ name: "About", href: "/about", isActive: true }],
        updatedAt: new Date(),
      }
}

export function saveNavbarConfig(config: NavbarConfig): void {
  if (typeof window === "undefined") return
  localStorage.setItem("stylesage_navbar", JSON.stringify(config))
}

// CRUD operations
export function createCategory(categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
  const categories = getCategories()
  const newCategory: Category = {
    ...categoryData,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  categories.push(newCategory)
  saveCategories(categories)
  return newCategory
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories()
  const index = categories.findIndex((cat) => cat.id === id)
  if (index === -1) return null

  categories[index] = { ...categories[index], ...updates, updatedAt: new Date() }
  saveCategories(categories)
  return categories[index]
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories()
  const filteredCategories = categories.filter((cat) => cat.id !== id)
  if (filteredCategories.length === categories.length) return false

  saveCategories(filteredCategories)
  return true
}

export function createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...productData,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  products.push(newProduct)
  saveProducts(products)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((prod) => prod.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...updates, updatedAt: new Date() }
  saveProducts(products)
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filteredProducts = products.filter((prod) => prod.id !== id)
  if (filteredProducts.length === products.length) return false

  saveProducts(filteredProducts)
  return true
}

export function updateStock(productId: string, newStock: number): boolean {
  return updateProduct(productId, { stock: newStock }) !== null
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
