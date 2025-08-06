import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface SEOItem {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "medium" | "low";
}

export function SEOOptimizationSummary() {
  const seoItems: SEOItem[] = [
    {
      title: "Enhanced Meta Tags",
      description:
        "Comprehensive meta tags with keywords, descriptions, and Open Graph data",
      status: "completed",
      priority: "high",
    },
    {
      title: "Structured Data Implementation",
      description:
        "Organization, LocalBusiness, Product, FAQ, and Website schemas",
      status: "completed",
      priority: "high",
    },
    {
      title: "Category Page SEO",
      description:
        "Individual metadata and structured data for Anime, Meme, Custom, Collections",
      status: "completed",
      priority: "high",
    },
    {
      title: "Enhanced Sitemap",
      description:
        "Dynamic sitemap with prioritization, product pages, and tag-based URLs",
      status: "completed",
      priority: "high",
    },
    {
      title: "Improved Robots.txt",
      description:
        "Optimized crawling rules with specific bot handling and crawl delays",
      status: "completed",
      priority: "medium",
    },
    {
      title: "FAQ Page",
      description:
        "Comprehensive FAQ with structured data for better search visibility",
      status: "completed",
      priority: "medium",
    },
    {
      title: "Contact Page",
      description:
        "Contact page with structured data and complete business information",
      status: "completed",
      priority: "medium",
    },
    {
      title: "PWA Manifest",
      description:
        "Progressive Web App manifest for mobile app-like experience",
      status: "completed",
      priority: "medium",
    },
    {
      title: "Performance Optimizations",
      description:
        "Preconnections, DNS prefetch, and resource hints for faster loading",
      status: "completed",
      priority: "high",
    },
    {
      title: "Mobile-First Design",
      description: "Responsive design optimized for mobile devices",
      status: "completed",
      priority: "high",
    },
    {
      title: "Image Optimization",
      description: "Optimized images with proper alt texts and lazy loading",
      status: "in-progress",
      priority: "medium",
    },
    {
      title: "Core Web Vitals",
      description:
        "Optimize LCP, FID, and CLS metrics for better user experience",
      status: "in-progress",
      priority: "high",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const completedItems = seoItems.filter(
    (item) => item.status === "completed"
  ).length;
  const totalItems = seoItems.length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          StyleSage SEO Optimization Status
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {completedItems}/{totalItems} ({completionPercentage}% Complete)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {seoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            {getStatusIcon(item.status)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(
                    item.priority
                  )}`}
                >
                  {item.priority} priority
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Next Steps for Further Optimization:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • Implement product page structured data for individual products
          </li>
          <li>• Add breadcrumb structured data to all pages</li>
          <li>• Create custom 404 and error pages with SEO optimization</li>
          <li>• Implement local SEO for multiple city targeting</li>
          <li>• Add customer review schema markup</li>
          <li>• Optimize image SEO with better file names and alt texts</li>
          <li>• Implement internal linking strategy</li>
          <li>• Add social media meta tags optimization</li>
        </ul>
      </div>
    </div>
  );
}
