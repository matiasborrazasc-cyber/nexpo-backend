import { Router } from 'express';
import { create } from '../controllers/bannerPublicityCreator';
import { updateController } from '../controllers/bannerPublicityUpdater';
import { deleteBannerPublicity } from '../controllers/bannerPublicityDeletor';
import { getBannerPublicityController, getBannersPublicityController } from '../controllers/bannerPublicityFinder';
import { getBannersPublicController } from '../controllers/bannerPublicityPublicController';
import { registerBannerViewController } from '../controllers/bannerPublicityViewController';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

// Públicos (sin auth)
router.get('/public', getBannersPublicController);
router.post('/:uuid/view', registerBannerViewController);

router.post('/', verifyToken, create);
router.get('/', verifyToken, getBannersPublicityController);
router.get('/:uuid', verifyToken, getBannerPublicityController);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteBannerPublicity);

export default router;