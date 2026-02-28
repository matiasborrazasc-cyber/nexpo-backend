import { v4 as uuidv4 } from 'uuid';
import ProductsCategories from './model/productsCategories';

class ProductsCategoriesFactory {

    public static createProductsCategoriesFromData(data: {
        name: string,
        store: string,
        fair: string
    }): ProductsCategories {
        return new ProductsCategories(uuidv4(), data.name, data.store, data.fair);
    }

    public static createProductCategories(data: {
        uuid: string,
        name: string,
        store: string,
        fair: string
    }): ProductsCategories {
        return new ProductsCategories(data.uuid, data.name, data.store, data.fair);
    }

    public static productCategoriesToJson(productCategories: ProductsCategories) {
        return {
            uuid: productCategories.getUuid(),
            name: productCategories.getName(),
            store: productCategories.getStore(),
            fair: productCategories.getFair()
        }
    }

}

export default ProductsCategoriesFactory;