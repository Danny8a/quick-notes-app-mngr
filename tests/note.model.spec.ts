import NoteModel from '../src/models/note.model';
import db from '../src/database/sqlite';

jest.mock('../src/database/sqlite', () => ({
    run: jest.fn(),
    get: jest.fn(),
    all: jest.fn()
}));

describe('NoteModel', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return all notes', async () => {
            const notes = [
                {id: 1, title: 'Test 1', description: 'Desc 1'},
                {id: 2, title: 'Test 2', description: 'Desc 2'}
            ];

            (db.all as jest.Mock).mockImplementation((sql, params, cb) => {
                if (typeof params === 'function') {
                    cb = params;
                }
                cb(null, notes);
            });

            const result = await NoteModel.findAll();
            expect(result).toEqual(notes);
        });
    });


    describe('findById', () => {
        it('should return a note by id', async () => {
            const note = {id: 1, title: 'Test', description: 'Desc'};

            (db.get as jest.Mock).mockImplementation((_sql, _params, cb) => {
                cb(null, note);
            });

            const result = await NoteModel.findById(1);
            expect(result).toEqual(note);
        });
    });

    describe('create', () => {
        it('should insert and return new note', async () => {
            (db.run as jest.Mock).mockImplementation((_sql, _params, cb) => {
                cb.call({lastID: 1, changes: 1}, null);
            });

            const result = await NoteModel.create('Note Title', 'Note Desc');
            expect(result).toEqual({id: 1, title: 'Note Title', description: 'Note Desc'});
        });
    });

    describe('update', () => {
        it('should update a note', async () => {
            (db.run as jest.Mock).mockImplementation((_sql, _params, cb) => {
                cb.call({lastID: 1, changes: 1}, null);
            });

            const result = await NoteModel.update(1, 'Updated Title', 'Updated Desc');
            expect(result).toBe(1);
        });
    });

    describe('remove', () => {
        it('should delete a note', async () => {
            (db.run as jest.Mock).mockImplementation((_sql, _params, cb) => {
                cb.call({lastID: 1, changes: 1}, null);
            });

            const result = await NoteModel.remove(1);
            expect(result).toBe(1);
        });
    });
});
