import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Keep DB as a singleton
let db = null;

async function initDB() {
  if (!db) {
    db = await open({
      filename: path.resolve(process.cwd(), "shop.db"),
      driver: sqlite3.Database,
    });
  }
}

// GET all earrings
export async function GET() {
  await initDB();
  const items = await db.all("SELECT * FROM earrings");
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

// POST new earring
export async function POST(req) {
  await initDB();
  try {
    const { name, description, price, material, style, image_url, stock_quantity } = await req.json();

    const result = await db.run(
      `INSERT INTO earrings (name, description, price, material, style, image_url, stock_quantity)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      name,
      description,
      price,
      material,
      style,
      image_url,
      stock_quantity ?? 0
    );

    return new Response(JSON.stringify({ success: true, id: result.lastID }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error adding earring:", err);
    return new Response(JSON.stringify({ error: "Failed to add earring" }), {
      status: 500,
    });
  }
}

// PUT (edit) an existing earring
export async function PUT(req) {
  await initDB();
  try {
    const { id, name, description, price, material, style, image_url, stock_quantity } = await req.json();

    await db.run(
      `UPDATE earrings
       SET name = ?, description = ?, price = ?, material = ?, style = ?, image_url = ?, stock_quantity = ?
       WHERE id = ?`,
      name,
      description,
      price,
      material,
      style,
      image_url,
      stock_quantity ?? 0,
      id
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error updating earring:", err);
    return new Response(JSON.stringify({ error: "Failed to update earring" }), {
      status: 500,
    });
  }
}

// DELETE an earring
export async function DELETE(req) {
  await initDB();
  try {
    const { id } = await req.json();

    await db.run(`DELETE FROM earrings WHERE id = ?`, id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error deleting earring:", err);
    return new Response(JSON.stringify({ error: "Failed to delete earring" }), {
      status: 500,
    });
  }
}
