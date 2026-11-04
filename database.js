const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file location
const dbPath = path.join(__dirname, 'tasks.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to SQLite database successfully');
    }
});

// Create tasks table
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        assigned_to TEXT,
        due_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('Error creating tasks table:', err.message);
    } else {
        console.log('Tasks table ready');
    }
});

// Export database connection
module.exports = db;
