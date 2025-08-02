// Debug script to check navbar configuration
console.log("=== Navbar Debug ===");

// Check localStorage
const categories = localStorage.getItem("stylesage_categories");
const navbar = localStorage.getItem("stylesage_navbar");

console.log(
  "Categories in localStorage:",
  categories ? JSON.parse(categories) : "Not found"
);
console.log(
  "Navbar config in localStorage:",
  navbar ? JSON.parse(navbar) : "Not found"
);

// Check default configuration
const DEFAULT_CATEGORIES = [
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
];

const DEFAULT_NAVBAR = {
  id: "default",
  categories: ["collections", "anime", "meme", "custom"],
  customLinks: [{ name: "About", href: "/about", isActive: true }],
  updatedAt: new Date(),
};

console.log("Default categories:", DEFAULT_CATEGORIES);
console.log("Default navbar config:", DEFAULT_NAVBAR);

// Reset localStorage with defaults
localStorage.setItem(
  "stylesage_categories",
  JSON.stringify(DEFAULT_CATEGORIES)
);
localStorage.setItem("stylesage_navbar", JSON.stringify(DEFAULT_NAVBAR));

console.log("Reset localStorage with defaults");
