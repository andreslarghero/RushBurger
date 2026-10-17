"use client";

import { formatUYU } from "@/data/menu";
import { cart, useCart } from "@/lib/cart";
import { itemCount, subtotal } from "@/lib/order";
import { OrderButton } from "./OrderButton";

export function MobileBar() {
  const { lines } = useCart();
  const count = itemCount(lines);

  if (count > 0) {
    return (
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pt-3 backdrop-blur sm:inset-x-auto sm:bottom-4 sm:right-4 sm:rounded-full sm:border sm:p-2">
        <button
          type="button"
          onClick={cart.openCheckout}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-rush px-6 font-bold text-ink hover:bg-cream"
        >
          Ver mi pedido ({count}) · {formatUYU(subtotal(lines))}
        </button>
      </div>
    );
  }

  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-white/10 bg-ink/95 px-4 pt-3 backdrop-blur sm:hidden">
      <a href="#menu" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-cream font-bold text-ink">
        Armá tu pedido
      </a>
      <OrderButton label="Consultá" className="flex-1" />
    </div>
  );
}
