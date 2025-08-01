import request from 'supertest';
import express, { Express } from 'express';
import noteRoutes from '../src/routes/note.routes';

describe('App Integration', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/notes', noteRoutes);
    });

    it('GET /notes should respond with 200', async () => {
        const response = await request(app).get('/notes');
        expect(response.status).toBe(200);
    });

    it('POST /notes should create a note', async () => {
        const response = await request(app)
            .post('/notes')
            .send({ title: 'Test note', description: 'Descripción' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test note');
    });
});
