import sqlite3 from "sqlite3";


// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./shop.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(`
      CREATE TABLE IF NOT EXISTS earrings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      material TEXT,
      style TEXT,
      image_url TEXT,
      stock_quantity INTEGER DEFAULT 0
    );`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created earrings table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM earrings`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from earrings");

        const values1 = [
            "Christmas",
            "Christmas earrings so you can feel the real Christmas feeling.",
            29.99,
            "Pearl",
            "Holidays",
            "https://media-hosting.imagekit.io/5f205dbd139e4703/schleifenohrringe.jpg",
            10,
        ];
        const values2 = [
            "Ball",
            "Earrings for a ball so you can feel like a true princess.",
            19.99,
            "Gold",
            "Elegant",
            "https://media-hosting.imagekit.io/9f7486d530f145fa/roteohrringe.jpg",
            20,
        ];
        const values3 = [
            "Mermaid",
            "Mermaid earrings to have the real siren experience.",
            34.99,
            "Gold",
            "Elegant",
            "https://media-hosting.imagekit.io/5c425b061efe4318/bluemchenohrringe.jpg",
            5,
        ];

      const insertSql = `INSERT INTO earrings (name, description, price, material, style, image_url, stock_quantity) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values3, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});
