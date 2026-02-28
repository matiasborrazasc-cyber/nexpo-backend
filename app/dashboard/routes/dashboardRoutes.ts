import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { getStatsController } from '../controllers/dashboardController';

const router = Router();
router.get('/stats', verifyToken, getStatsController);

export default router;
