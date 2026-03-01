import { DynamicNavbar } from "@/components/dynamic-navbar";
import { Footer } from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="font-display font-bold text-xl uppercase mb-6">
              Admin Panel
            </h2>
            <nav className="flex flex-col gap-2">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <div className="my-2 border-t border-border" />
              <p className="text-xs text-muted-foreground uppercase font-bold px-4 mb-2">
                Commerce
              </p>
              <Link href="/admin/products/new">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-primary"
                >
                  Add Product
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="ghost" className="w-full justify-start">
                  Orders
                </Button>
              </Link>
              <div className="my-2 border-t border-border" />
              <p className="text-xs text-muted-foreground uppercase font-bold px-4 mb-2">
                CMS
              </p>
              <Link href="/admin/cms/collections">
                <Button variant="ghost" className="w-full justify-start">
                  Collections
                </Button>
              </Link>
              <Link href="/admin/cms/navbar">
                <Button variant="ghost" className="w-full justify-start">
                  Navbar
                </Button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
