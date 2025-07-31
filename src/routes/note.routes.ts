import { Router } from 'express';
import noteController from '../controllers/note.controller';

const router = Router();

router.get('/', noteController.getAll);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

export default router;
