import { Router } from 'express';
import { getConfigController, getPublicConfigController, updateConfigController } from '../controllers/fairConfigController';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.get('/public', getPublicConfigController);
router.get('/', verifyToken, getConfigController);
router.put('/', verifyToken, updateConfigController);

export default router;
