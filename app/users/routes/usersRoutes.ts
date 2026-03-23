import { Router } from 'express';
import { create } from '../controllers/usersCreator';
import { getUserController, getUsersController, login } from '../controllers/usersFinder';
import { authSocial } from '../controllers/usersAuthSocial';
import { updateMeController } from '../controllers/usersProfileUpdater';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', create);
router.post('/login', login);
router.post('/auth/social', authSocial);
router.put('/me', verifyToken, updateMeController);
router.get('/', verifyToken, getUsersController);
router.get('/:uuid', getUserController);

export default router;