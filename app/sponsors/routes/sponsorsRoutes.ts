import { Router } from 'express';
import { create } from '../controllers/sponsorsCreator';
import { updateController } from '../controllers/sponsorsUpdater';
import { sponsorsDeletor } from '../controllers/sponsorsDeletor';
import { verifyToken } from '../../middleware/auth.middleware';
import { getSponsorsController, getSponsorsByUuidController } from '../controllers/sponsorsFinder';

const router = Router();

router.post('/', verifyToken, create);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, sponsorsDeletor);
router.get('/:uuid', verifyToken, getSponsorsByUuidController);
router.get('/', verifyToken, getSponsorsController);

export default router;