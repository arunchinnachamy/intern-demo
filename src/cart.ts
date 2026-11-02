export interface CartItem {
  sku: string;
  priceCents: number;
  qty: number;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
}

const COUPONS: Record<string, number> = {
  INTERN10: 10,
  WELCOME20: 20,
};

export function subtotalCents(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
}

export function discountPercent(code?: string): number {
  if (!code) return 0;
  return COUPONS[code.trim().toUpperCase()] ?? 0;
}

export const SHIPPING_FEE_CENTS = 499;
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000;

function discountedSubtotalCents(cart: Cart): number {
  const subtotal = subtotalCents(cart);
  const percent = discountPercent(cart.couponCode);
  const discount = Math.round((subtotal * percent) / 100);
  return subtotal - discount;
}

// Based on the post-discount subtotal; empty carts pay no shipping.
export function shippingCents(cart: Cart): number {
  if (cart.items.length === 0) return 0;
  return discountedSubtotalCents(cart) >= FREE_SHIPPING_THRESHOLD_CENTS
    ? 0
    : SHIPPING_FEE_CENTS;
}

export function totalCents(cart: Cart): number {
  return discountedSubtotalCents(cart) + shippingCents(cart);
}

export function addItem(cart: Cart, item: CartItem): Cart {
  const existing = cart.items.find((i) => i.sku === item.sku);
  if (existing) {
    return {
      ...cart,
      items: cart.items.map((i) =>
        i.sku === item.sku ? { ...i, qty: i.qty + item.qty } : i,
      ),
    };
  }
  return { ...cart, items: [...cart.items, item] };
}
