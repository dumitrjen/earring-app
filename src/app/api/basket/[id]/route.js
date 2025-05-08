import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

let db = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: path.resolve(process.cwd(), "shop.db"),
      driver: sqlite3.Database,
    });
  }
  return db;
}

// GET: Fetch basket items
export async function GET(req, { params }) {
  const userId = params.id;

  try {
    const db = await openDb();

    // Get user's basket
    const basket = await db.get("SELECT * FROM baskets WHERE user_id = ?", [userId]);
    if (!basket) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get basket items joined with earrings data
    const items = await db.all(
      `
      SELECT 
        e.id,
        e.name,
        e.price,
        be.quantity
      FROM basket_earrings be
      JOIN earrings e ON e.id = be.earring_id
      WHERE be.basket_id = ?
    `,
      [basket.id]
    );

    return new Response(JSON.stringify(items), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch basket:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT: Update item quantity
export async function PUT(req, { params }) {
  const userId = params.id;
  const { id, action } = await req.json();

  try {
    const db = await openDb();

    // Get user's basket
    const basket = await db.get("SELECT * FROM baskets WHERE user_id = ?", [userId]);
    if (!basket) {
      return new Response(
        JSON.stringify({ error: "Basket not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update item quantity based on action
    if (action === "increase") {
      await db.run(
        `
        UPDATE basket_earrings
        SET quantity = quantity + 1
        WHERE basket_id = ? AND earring_id = ?
      `,
        [basket.id, id]
      );
    } else if (action === "decrease") {
      await db.run(
        `
        UPDATE basket_earrings
        SET quantity = quantity - 1
        WHERE basket_id = ? AND earring_id = ? AND quantity > 1
      `,
        [basket.id, id]
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to update basket:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE: Remove item from basket
export async function DELETE(req, { params }) {
  const userId = params.id;
  const { id } = await req.json();

  try {
    const db = await openDb();

    // Get user's basket
    const basket = await db.get("SELECT * FROM baskets WHERE user_id = ?", [userId]);
    if (!basket) {
      return new Response(
        JSON.stringify({ error: "Basket not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Remove item from basket
    await db.run(
      `
      DELETE FROM basket_earrings
      WHERE basket_id = ? AND earring_id = ?
    `,
      [basket.id, id]
    );

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to remove item from basket:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}