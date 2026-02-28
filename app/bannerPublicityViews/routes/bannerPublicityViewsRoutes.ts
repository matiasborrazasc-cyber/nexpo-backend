import { Router } from 'express';
import { create } from '../controllers/bannerPublicityViewsCreator';
import { getBannerPublicityViewsController, getBannersPublicityViewsController } from '../controllers/bannerPublicityViewsFinder';

const router = Router();

router.post('/', create);
router.get('/:uuid', getBannerPublicityViewsController);
router.get('/', getBannersPublicityViewsController);


export default router;