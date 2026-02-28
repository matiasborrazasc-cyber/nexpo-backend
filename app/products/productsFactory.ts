import { v4 as uuidv4 } from 'uuid';
import Product from './model/product';

class ProductsFactory {

    public static createProductsFromData(data: {
        store: string,
        title: string,
        description: string,
        image: string,
        price: number,
        currency: string,
        category: string,
        fair: string
    }): Product {
        return new Product(uuidv4(), data.image, data.price, data.currency, data.description, data.title, data.category, data.store, data.fair);
    }

    public static createProduct(data: {
        uuid: string,
        store: string,
        title: string,
        description: string,
        image: string,
        price: number,
        currency: string,
        category: string,
        fair: string
    }): Product {
        return new Product(data.uuid, data.image, data.price, data.currency, data.description, data.title, data.category, data.store, data.fair);
    }

    public static productToJson(product: Product) {
        return {
            uuid: product.getUuid(),
            store: product.getStore(),
            title: product.getTitle(),
            description: product.getDescription(),
            image: product.getImage(),
            price: product.getPrice(),
            currency: product.getCurrency(),
            category: product.getCategory(),
            fair: product.getFair()
        }
    }

}

export default ProductsFactory;