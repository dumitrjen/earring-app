import sqlite3 from "sqlite3";

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./shop.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  }
);

// Create the users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Create the baskets table (1 basket per user)
db.run(`
  CREATE TABLE IF NOT EXISTS baskets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`, (err) => {
  if (err) return console.error(err.message);
  console.log("Created baskets table.");
});

// Create the basket_earrings table (many-to-many with quantity)
db.run(`
  CREATE TABLE IF NOT EXISTS basket_earrings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    basket_id INTEGER NOT NULL,
    earring_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (basket_id) REFERENCES baskets(id),
    FOREIGN KEY (earring_id) REFERENCES earrings(id)
  );
`, (err) => {
  if (err) return console.error(err.message);
  console.log("Created basket_earrings table.");
});

// Create the earrings table and insert demo data
db.serialize(() => {
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
    );
  `, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Created earrings table.");

    // Clear the existing data
    db.run(`DELETE FROM earrings`, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("All rows deleted from earrings.");

      const insertSql = `INSERT INTO earrings (name, description, price, material, style, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const sampleEarrings = [
        [
          "Christmas",
          "Christmas earrings so you can feel the real Christmas feeling.",
          29.99,
          "Pearl",
          "Holidays",
          "https://i.ibb.co/MxYwPT80/schleifenohrringe.jpg",
          10
        ],
        [
          "Ball",
          "Earrings for a ball so you can feel like a true princess.",
          19.99,
          "Gold",
          "Elegant",
          "https://i.ibb.co/BV6x949p/bluemchenohrringe.jpg",
          20
        ],
        [
          "Mermaid",
          "Mermaid earrings to have the real siren experience.",
          34.99,
          "Gold",
          "Elegant",
          "https://i.ibb.co/mV0jqPMS/roteohrringe.jpg",
          5
        ]
      ];

      sampleEarrings.forEach((values) => {
        db.run(insertSql, values, function (err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Inserted earring with ID ${this.lastID}`);
        });
      });

      // Close the database connection after inserts
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Closed the database connection.");
      });
    });
  });
});
