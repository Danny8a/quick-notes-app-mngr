import sqlite3Pkg from 'sqlite3';

const sqlite3 = sqlite3Pkg.verbose();
const db = new sqlite3.Database('./notes.db');

db.serialize((): void => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            title       TEXT NOT NULL,
            description TEXT
        );
    `);
});

export default db;
