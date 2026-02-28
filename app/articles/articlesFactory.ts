import { v4 as uuidv4 } from 'uuid';
import Articles from './model/articles';

class ArticlesFactory {

    public static createArticlesFromData(data: {
        description: string,
        name: string,
        imagen: string,
        url: string,
        category: string,
        fair: string
    }): Articles {
        return new Articles(uuidv4(), data.description, data.name, data.imagen, data.url, data.fair, data.category);
    }

    public static createArticles(data: {
        uuid: string,
        description: string,
        name: string,
        imagen: string,
        url: string,
        category: string,
        fair: string,
    }): Articles {
        return new Articles(data.uuid, data.description, data.name, data.imagen, data.url, data.fair, data.category);
    }

    public static articlesToJson(articles: Articles) {
        return {
            uuid: articles.getUuid(),
            description: articles.getDescription(),
            name: articles.getName(),
            imagen: articles.getImagen(),
            url: articles.getUrl(),
            category: articles.getCategory(),
            fair: articles.getFair()
        }
    }

}

export default ArticlesFactory;