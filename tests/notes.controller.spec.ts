import { Request, Response } from 'express';
import controller from '../src/controllers/note.controller';
import NoteModel from '../src/models/note.model';

jest.mock('../src/models/note.model');

describe('notes.controller', () => {
    const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    } as unknown as Response;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return list of notes', async () => {
            (NoteModel.findAll as jest.Mock).mockResolvedValue([
                { id: 1, title: 'A', description: 'B' }
            ]);

            const req = {} as Request;
            await controller.getAll(req, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith([
                { id: 1, title: 'A', description: 'B' }
            ]);
        });

        it('should handle error', async () => {
            const error = new Error('DB error');
            (NoteModel.findAll as jest.Mock).mockRejectedValue(error);

            const req = {} as Request;
            await controller.getAll(req, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });

    describe('create', () => {
        it('should create a note', async () => {
            const req = {
                body: { title: 'Note', description: 'Desc' }
            } as Request;

            (NoteModel.create as jest.Mock).mockResolvedValue({
                id: 1,
                title: 'Note',
                description: 'Desc'
            });

            await controller.create(req, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                id: 1,
                title: 'Note',
                description: 'Desc'
            });
        });

        it('should return 400 if title missing', async () => {
            const req = { body: {} } as Request;

            await controller.create(req, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'El título es obligatorio y debe ser una cadena'
            });
        });
    });

    describe('update', () => {
        it('should update a note', async () => {
            const req = {
                params: { id: '1' },
                body: { title: 'Updated', description: 'New desc' }
            } as unknown as Request;

            (NoteModel.update as jest.Mock).mockResolvedValue(1);

            await controller.update(req, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({
                id: 1,
                title: 'Updated',
                description: 'New desc'
            });
        });

        it('should return 404 if note not found', async () => {
            const req = {
                params: { id: '999' },
                body: { title: 'X', description: 'Y' }
            } as unknown as Request;

            (NoteModel.update as jest.Mock).mockResolvedValue(0);

            await controller.update(req, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Nota no encontrada' });
        });
    });

    describe('remove', () => {
        it('should delete a note', async () => {
            const req = { params: { id: '1' } } as unknown as Request;

            (NoteModel.remove as jest.Mock).mockResolvedValue(1);

            await controller.remove(req, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(204);
            expect(mockRes.send).toHaveBeenCalled();
        });

        it('should return 404 if note not found', async () => {
            const req = { params: { id: '999' } } as unknown as Request;

            (NoteModel.remove as jest.Mock).mockResolvedValue(0);

            await controller.remove(req, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Nota no encontrada' });
        });
    });
});
