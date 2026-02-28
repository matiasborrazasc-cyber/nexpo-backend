import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { getUsersFairController } from '../controllers/usersFairFinder';
import { getMatchVisibleController } from '../controllers/usersFairMatchVisibleFinder';
import { updateMatchVisibleController } from '../controllers/usersFairProfileUpdater';

const router = Router();
router.get('/me', verifyToken, getMatchVisibleController);
router.put('/me', verifyToken, updateMatchVisibleController);
router.get('/', verifyToken, getUsersFairController);
export default router;


