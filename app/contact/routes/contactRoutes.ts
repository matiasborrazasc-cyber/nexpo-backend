import { Router } from 'express';
import { sendContactController } from '../controllers/contactController';

const router = Router();

router.post('/', sendContactController);

export default router;
