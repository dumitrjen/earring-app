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

export async function POST(req) {
  const { userId, earringId, quantity } = await req.json();

  if (!userId || !earringId || !quantity || quantity <= 0) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid input" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const db = await openDb();

    // Step 1: Find or create a basket for the user
    let basket = await db.get("SELECT * FROM baskets WHERE user_id = ?", [userId]);

    if (!basket) {
      const result = await db.run("INSERT INTO baskets (user_id) VALUES (?)", [userId]);
      basket = { id: result.lastID };
    }

    // Step 2: Check if the item already exists in the basket
    const existingItem = await db.get(
      "SELECT * FROM basket_earrings WHERE basket_id = ? AND earring_id = ?",
      [basket.id, earringId]
    );

    if (existingItem) {
      // Step 3a: Update quantity if item exists
      await db.run(
        "UPDATE basket_earrings SET quantity = quantity + ? WHERE id = ?",
        [quantity, existingItem.id]
      );
    } else {
      // Step 3b: Insert new item if not in basket
      await db.run(
        "INSERT INTO basket_earrings (basket_id, earring_id, quantity) VALUES (?, ?, ?)",
        [basket.id, earringId, quantity]
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error adding to basket:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
