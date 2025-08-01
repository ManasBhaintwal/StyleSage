"use client";

import { AuthProvider } from "@/lib/auth-context";
import { CartProvider, useCart } from "@/lib/cart-context";

interface CombinedProvidersProps {
  children: React.ReactNode;
}

function CartWithAuthIntegration({ children }: { children: React.ReactNode }) {
  const { migrateCart } = useCart();

  return <AuthProvider onLogin={migrateCart}>{children}</AuthProvider>;
}

export function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <CartProvider>
      <CartWithAuthIntegration>{children}</CartWithAuthIntegration>
    </CartProvider>
  );
}
