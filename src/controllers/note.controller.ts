import { Request, Response } from 'express';
import NoteModel from '../models/note.model';
import { NoteInput } from '../interfaces/note.interface';

const validateNoteInput = ({ title }: Partial<NoteInput>): string | null => {
    if (!title) {
        return 'El título es obligatorio y debe ser una cadena';
    }
    return null;
};

const handleError = (res: Response, err: unknown): void => {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
};

const getAll = async (req: Request, res: Response) => {
    try {
        const notes = await NoteModel.findAll();
        res.json(notes);
    } catch (err) {
        handleError(res, err);
    }
};

const create = async (req: Request, res: Response) => {
    const error = validateNoteInput(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const { title, description }: NoteInput = req.body;
        const note = await NoteModel.create(title, description);
        res.status(201).json(note);
    } catch (err) {
        handleError(res, err);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const error = validateNoteInput(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const { title, description }: NoteInput = req.body;
        const updated = await NoteModel.update(Number(id), title, description);
        return updated === 0
            ? res.status(404).json({ error: 'Nota no encontrada' })
            : res.json({ id: Number(id), title, description });
    } catch (err) {
        handleError(res, err);
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await NoteModel.remove(Number(id));
        return deleted === 0
            ? res.status(404).json({ error: 'Nota no encontrada' })
            : res.status(204).send();
    } catch (err) {
        handleError(res, err);
    }
};

export default {
    getAll,
    create,
    update,
    remove
};
