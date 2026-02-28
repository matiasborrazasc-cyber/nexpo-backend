import { Router } from 'express';
import { create } from '../controllers/giveawaysCreator';
import { updateController } from '../controllers/giveawaysUpdater';
import { deleteGiveaways } from '../controllers/giveawaysDeletor';
import { getGiveawaysController, getGiveawaysByUuidController } from '../controllers/giveawaysFinder';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, getGiveawaysController);
router.get('/:uuid', verifyToken, getGiveawaysByUuidController);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteGiveaways);

export default router;