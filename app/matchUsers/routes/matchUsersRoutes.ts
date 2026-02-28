import { Router } from 'express';
import { create } from '../controllers/matchUsersCreator';
import { updateController } from '../controllers/matchUsersUpdater';
import { deleteMatchUsers } from '../controllers/matchUsersDeletor';
import { getMatchUserByUuidController, getMatchUsersController, getInvitationsSentController, getReceivedController, getConnectionsController } from '../controllers/matchUsersFinder';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, create);
router.get('/sent', verifyToken, getInvitationsSentController);
router.get('/received', verifyToken, getReceivedController);
router.get('/connections', verifyToken, getConnectionsController);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteMatchUsers);
router.get('/:uuid', getMatchUsersController);
router.get('/', verifyToken, getMatchUserByUuidController);

export default router;