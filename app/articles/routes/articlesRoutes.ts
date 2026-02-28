import { Router } from 'express';
import { create } from '../controllers/articlesCreator';
import { updateController } from '../controllers/articlesUpdater';
import { getArticleController, getArticlesController } from '../controllers/articlesFinder';
import { deleteArticle } from '../controllers/articlesDeletor';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, getArticlesController);
router.get('/:uuid', verifyToken, getArticleController);
router.put('/:uuid', verifyToken, updateController);
router.delete('/:uuid', verifyToken, deleteArticle);

export default router;