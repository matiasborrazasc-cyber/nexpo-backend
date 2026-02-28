import { Router } from 'express';
import { create } from '../controllers/influencerLinkViewsCreator';
import { updateController } from '../controllers/influencerLinkViewsUpdater';
import { deleteInfluencerLinkViews } from '../controllers/influencerLinkViewsDeletor';
import { getInfluencerLinksViewController, getInfluencerLinkViewByUuidController } from '../controllers/influencerLinkViewsFinder';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteInfluencerLinkViews);
router.get('/:uuid', verifyToken, getInfluencerLinksViewController);
router.get('/', verifyToken, getInfluencerLinkViewByUuidController);

export default router;