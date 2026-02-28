import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { create } from '../controllers/productsCategoriesCreator';
import { updateController } from '../controllers/productsCategoriesUpdater';
import { productsCategoriesDeletor } from '../controllers/productsCategoriesDeletor';
import { getProductCategoriesByStoreController } from '../controllers/productsCategoriesFinder';

const router = Router();

router.get('/by-store/:store', verifyToken, getProductCategoriesByStoreController);
router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, productsCategoriesDeletor);

export default router;