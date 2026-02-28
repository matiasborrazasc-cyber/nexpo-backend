import { Router } from 'express';
import { create } from '../controllers/usersCreator';
import { getUserController, getUsersController, login } from '../controllers/usersFinder';
import { updateMeController } from '../controllers/usersProfileUpdater';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', create);
router.post('/login', login);
router.put('/me', verifyToken, updateMeController);
router.get('/', verifyToken, getUsersController);
router.get('/:uuid', getUserController);

export default router;