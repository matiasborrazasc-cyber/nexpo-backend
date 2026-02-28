import { Router } from 'express';
import { create } from '../controllers/giveawaysWinnersCreator';
import { updateController } from '../controllers/giveawaysWinnersUpdater';
import { deleteGiveawaysWinners } from '../controllers/giveawaysWinnersDeletor';
import { getGiveawaysWinnersByUuidController, getGiveawaysController } from '../controllers/giveawaysWinnersFinder';
import { verifyToken } from '../../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteGiveawaysWinners);
router.get('/:uuid', verifyToken, getGiveawaysWinnersByUuidController);
router.get('/', verifyToken, getGiveawaysController);


export default router;