import { Router } from 'express';
import { getStoreController, getStoresController } from '../controllers/storesFinder';
import { create } from '../controllers/storesCreator';
import { updateController } from '../controllers/storesUpdater';
import { storesDeletor } from '../controllers/storesDeletor';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', verifyToken, getStoresController);
router.get('/:uuid', verifyToken, getStoreController);
router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, storesDeletor);

export default router;