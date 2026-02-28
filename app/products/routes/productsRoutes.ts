import { Router } from 'express';
import { create } from '../controllers/productsCreator';
import { updateController } from '../controllers/productsUpdater';
import { productsDeletor } from '../controllers/productsDeletor';
import { getProductByUuidController, getProductController } from '../controllers/productsFinder';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, productsDeletor);
router.get('/:uuid', verifyToken, getProductByUuidController);
router.get('/by-store/:store', verifyToken, getProductController);


export default router;