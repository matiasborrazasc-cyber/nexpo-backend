import { Router } from 'express';
import { create } from '../controllers/influencerCreator';
import { getInfluencerController, getInfluencersController } from '../controllers/influencerFinder';
import { deleteInfluencer } from '../controllers/influencerDeletor';
import { updateController } from '../controllers/influencerUpdater';
import { redirectByLink } from '../controllers/influencerRedirector';
import { getInfluencerViewsController } from '../controllers/influencerViewsController';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

// Público: redirección por link (debe ir antes de /:uuid)
router.get('/go/:link', redirectByLink);

router.get('/', verifyToken, getInfluencersController);
router.get('/:uuid/views', verifyToken, getInfluencerViewsController);
router.get('/:uuid', verifyToken, getInfluencerController);
router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteInfluencer);

export default router;