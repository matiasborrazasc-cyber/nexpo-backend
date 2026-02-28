import { Router } from 'express';   
import { create } from '../controllers/commentsEventCalendarCreator';
import { updateController } from '../controllers/commentsEventCalendarUpdater';
import { deleteCommentsEventCalendar } from '../controllers/commentsEventCalendarDeletor';

const router = Router();

router.post('/', create);
router.put('/:uuid', updateController);
router.delete('/:uuid', deleteCommentsEventCalendar);


export default router;