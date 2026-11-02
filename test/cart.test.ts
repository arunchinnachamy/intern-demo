import { test } from "node:test";
import assert from "node:assert/strict";
import { addItem, discountPercent, totalCents, type Cart } from "../src/cart.ts";

test("subtotal without coupon", () => {
  const cart: Cart = { items: [{ sku: "mug", priceCents: 1200, qty: 2 }] };
  assert.equal(totalCents(cart), 2400);
});

test("coupon codes are case-insensitive", () => {
  assert.equal(discountPercent(" intern10 "), 10);
});

test("INTERN10 takes 10% off", () => {
  const cart: Cart = {
    items: [{ sku: "mug", priceCents: 1000, qty: 1 }],
    couponCode: "INTERN10",
  };
  assert.equal(totalCents(cart), 900);
});

test("adding the same sku merges quantities", () => {
  const cart = addItem({ items: [{ sku: "mug", priceCents: 1000, qty: 1 }] }, {
    sku: "mug",
    priceCents: 1000,
    qty: 2,
  });
  assert.equal(cart.items.length, 1);
  assert.equal(cart.items[0].qty, 3);
});
