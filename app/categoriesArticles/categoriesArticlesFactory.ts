import { v4 as uuidv4 } from 'uuid';
import CategoriesArticles from './model/categoriesArticles';

class CategoriesArticlesFactory {

    public static createCategoriesArticlesFromData(data: {
        name: string,
        fair: string
    }): CategoriesArticles {
        return new CategoriesArticles(uuidv4(), data.name, data.fair);
    }

    public static createCategoriesArticles(data: {
        uuid: string,
        name: string,
        fair: string
    }): CategoriesArticles {
        return new CategoriesArticles(data.uuid, data.name, data.fair);
    }

    public static categoriesArticlesToJson(categoriesArticles: CategoriesArticles) {
        return {
            uuid: categoriesArticles.getUuid(),
            name: categoriesArticles.getName(),
            fair: categoriesArticles.getFair()
        }
    }

}

export default CategoriesArticlesFactory;