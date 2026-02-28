import { Router } from 'express'; 
import { create } from '../controllers/speakersCreator';
import { updateController } from '../controllers/speakersUpdater';
import { speakerDeletor } from '../controllers/speakersDeletor';
import { getSpeakersController, getSpeakerByUuidController } from '../controllers/speakersFinder';
import { verifyToken } from '../../middleware/auth.middleware';


const router = Router();

router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, speakerDeletor);
router.get('/', verifyToken, getSpeakersController);
router.get('/:uuid', verifyToken, getSpeakerByUuidController);

export default router;