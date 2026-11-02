import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addItem,
  discountPercent,
  shippingCents,
  totalCents,
  type Cart,
} from "../src/cart.ts";

test("subtotal without coupon, under $50 adds shipping", () => {
  const cart: Cart = { items: [{ sku: "mug", priceCents: 1200, qty: 2 }] };
  assert.equal(shippingCents(cart), 499);
  assert.equal(totalCents(cart), 2400 + 499);
});

test("$49.99 pays shipping, $50.00 ships free", () => {
  const under: Cart = { items: [{ sku: "a", priceCents: 4999, qty: 1 }] };
  const exact: Cart = { items: [{ sku: "a", priceCents: 5000, qty: 1 }] };
  assert.equal(totalCents(under), 4999 + 499);
  assert.equal(shippingCents(exact), 0);
  assert.equal(totalCents(exact), 5000);
});

test("empty cart has no shipping", () => {
  assert.equal(totalCents({ items: [] }), 0);
});

test("coupon codes are case-insensitive", () => {
  assert.equal(discountPercent(" intern10 "), 10);
});

test("INTERN10 takes 10% off", () => {
  const cart: Cart = {
    items: [{ sku: "mug", priceCents: 1000, qty: 1 }],
    couponCode: "INTERN10",
  };
  assert.equal(totalCents(cart), 900 + 499);
});

test("adding the same sku merges quantities", () => {
  const cart = addItem(
    { items: [{ sku: "mug", priceCents: 1000, qty: 1 }] },
    {
      sku: "mug",
      priceCents: 1000,
      qty: 2,
    },
  );
  assert.equal(cart.items.length, 1);
  assert.equal(cart.items[0].qty, 3);
});
