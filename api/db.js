const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Vercel Serverless environment requires writing to /tmp
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel ? '/tmp/foodshare.db' : path.join(__dirname, 'foodshare.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log(`Connected to the SQLite database at ${dbPath}`);
        createTables();
    }
});

function createTables() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            full_name TEXT,
            phone_number TEXT
        )`);

        // Listings Table
        db.run(`CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            donor_id INTEGER,
            food_name TEXT,
            description TEXT,
            quantity TEXT,
            location TEXT,
            event_type TEXT,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (donor_id) REFERENCES users (id)
        )`);
    });
}

module.exports = db;
