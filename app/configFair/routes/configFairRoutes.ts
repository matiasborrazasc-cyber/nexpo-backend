import { Router } from 'express';
import { create } from '../controllers/configFairCreator';
import { updateController } from '../controllers/configFairUpdater';
import { deleteConfigFair } from '../controllers/configFairDeletor';

const router = Router();

router.post('/', create);
router.put('/:uuid', updateController);
router.delete('/:uuid', deleteConfigFair);


export default router;