import { Router } from 'express';
import { create } from '../controllers/eventCalendarCreator';
import { updateController } from '../controllers/eventCalendarUpdater';
import { deleteEventCalendar } from '../controllers/eventCalendarDeletor';
import { getEventCalendarController, getEventCalendarsController } from '../controllers/eventCalendarFinder';
import { verifyToken } from '../../middleware/auth.middleware';


const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, getEventCalendarsController);
router.get('/:uuid', verifyToken, getEventCalendarController);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteEventCalendar);


export default router;