import { Router } from 'express';  
import { create } from '../controllers/categoriesArticlesCreator';
import { getCategoriesArticlesController, getCategoryArticlesController } from '../controllers/categoriesArticlesFinder';

const router = Router();

router.post('/', create);
router.get('/:uuid', getCategoryArticlesController);
router.get('/', getCategoriesArticlesController);

export default router;