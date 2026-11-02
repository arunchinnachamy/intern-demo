import { createServer } from "node:http";
import { addItem, shippingCents, totalCents, type Cart } from "./cart.js";

let cart: Cart = { items: [] };

const server = createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "GET" && req.url === "/cart") {
    res.end(
      JSON.stringify({
        ...cart,
        shippingCents: shippingCents(cart),
        totalCents: totalCents(cart),
      }),
    );
    return;
  }

  if (req.method === "POST" && req.url === "/cart/items") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const item = JSON.parse(body);
    cart = addItem(cart, item);
    res.statusCode = 201;
    res.end(JSON.stringify(cart));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not found" }));
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => console.log(`intern-demo listening on :${port}`));
