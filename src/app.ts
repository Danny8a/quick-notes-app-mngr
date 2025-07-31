import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/note.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
