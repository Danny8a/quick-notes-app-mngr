import express, {Express} from 'express';
import request from 'supertest';
import router from '../src/routes/note.routes';
import noteController from '../src/controllers/note.controller';

jest.mock('../src/controllers/note.controller', () => ({
    getAll: jest.fn((res) => res.status(200).json([])),
    create: jest.fn((res) => res.status(201).json({})),
    update: jest.fn((res) => res.status(200).json({})),
    remove: jest.fn((res) => res.status(204).send()),
}));

describe('note.routes', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/notes', router);
    });

    it('GET /notes should call noteController.getAll', async () => {
        await request(app).get('/notes').expect(200);
        expect(noteController.getAll).toHaveBeenCalled();
    });

    it('POST /notes should call noteController.create', async () => {
        await request(app)
            .post('/notes')
            .send({title: 'X', description: 'Y'})
            .expect(201);
        expect(noteController.create).toHaveBeenCalled();
    });

    it('PUT /notes/:id should call noteController.update', async () => {
        await request(app)
            .put('/notes/1')
            .send({title: 'X', description: 'Y'})
            .expect(200);
        expect(noteController.update).toHaveBeenCalled();
    });

    it('DELETE /notes/:id should call noteController.remove', async () => {
        await request(app).delete('/notes/1').expect(204);
        expect(noteController.remove).toHaveBeenCalled();
    });
});
