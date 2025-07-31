import db from '../database/sqlite';
import { promisify } from 'node:util';
import { Note } from '../interfaces/note.interface';

const dbAll = promisify(db.all.bind(db)) as (sql: string, params?: any[]) => Promise<Note[]>;
const dbGet = promisify(db.get.bind(db)) as (sql: string, params?: any[]) => Promise<Note | undefined>;

const dbRun = (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> =>
    new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });

const NoteModel = {
    async findAll(): Promise<Note[]> {
        return await dbAll('SELECT * FROM notes');
    },

    async findById(id: number): Promise<Note | undefined> {
        return await dbGet('SELECT * FROM notes WHERE id = ?', [id]);
    },

    async create(title: string, description: string): Promise<Note> {
        const result = await dbRun(
            'INSERT INTO notes (title, description) VALUES (?, ?)',
            [title, description]
        );
        return { id: result.lastID, title, description };
    },

    async update(id: number, title: string, description: string): Promise<number> {
        const result = await dbRun(
            'UPDATE notes SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );
        return result.changes;
    },

    async remove(id: number): Promise<number> {
        const result = await dbRun('DELETE FROM notes WHERE id = ?', [id]);
        return result.changes;
    }
};

export default NoteModel;
