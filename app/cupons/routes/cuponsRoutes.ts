import { Router } from 'express';
import { create } from '../controllers/cuponsCreator';
import { updateController } from '../controllers/cuponsUpdater';
import { deleteCupons } from '../controllers/cuponsDeletor';
import { verifyToken } from '../../middleware/auth.middleware';
import { getCuponByUuidController, getCuponsController } from '../controllers/cuponsFinder';

const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, getCuponsController);
router.get('/:uuid', verifyToken, getCuponByUuidController);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteCupons);




export default router;