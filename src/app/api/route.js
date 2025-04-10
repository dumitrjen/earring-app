import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";




// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET() {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
        filename: path.resolve(process.cwd(), "shop.db"),
        driver: sqlite3.Database,
      });
  }

  // Perform a database query to retrieve all items from the "items" table
  const items = await db.all("SELECT * FROM earrings");

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
