import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { login } from '../controllers/adminFinder';
import { create } from '../controllers/adminCreator';
import { getAdminUsersFairController } from '../controllers/adminUsersFairFinder';

const router = Router();

router.post('/login', login);
router.post('/register', create);
router.get('/users-fair', verifyToken, getAdminUsersFairController);

export default router;
