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
  const body = await req.json();

  try {
    const db = await openDb();

    if (body.identifier) {
      // Handle checking if user exists
      const { identifier } = body;

      const user = await db.get(
        "SELECT * FROM users WHERE name = ? OR email = ?",
        identifier,
        identifier
      );

      if (!user) {
        return new Response(
          JSON.stringify({ exists: false }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          exists: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password, // In production, do not return the password
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else if (body.username && body.email && body.password) {
      // Handle user registration
      const { username, email, password } = body;

      const existingUser = await db.get(
        "SELECT * FROM users WHERE name = ? OR email = ?",
        username,
        email
      );

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "User already exists" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const result = await db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        username,
        email,
        password // In production, hash the password before saving
      );

      return new Response(
        JSON.stringify({ success: true, userId: result.lastID }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}