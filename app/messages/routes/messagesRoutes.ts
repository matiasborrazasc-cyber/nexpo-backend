import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { create } from '../controllers/messagesCreator';
import { updateController } from '../controllers/messagesUpdater';
import { deleteMessages } from '../controllers/messagesDeletor';
import { getConversationsController, getChatWithContactController } from '../controllers/messagesFinder';

const router = Router();

router.get('/conversations', verifyToken, getConversationsController);
router.get('/chat/:contactUuid', verifyToken, getChatWithContactController);
router.post('/', verifyToken, create);
router.put('/:uuid', updateController);
router.delete('/:uuid', deleteMessages);

export default router;