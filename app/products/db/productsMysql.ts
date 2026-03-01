import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Product from '../model/product';
import ProductsFactory from '../productsFactory';
import { safe } from '../../utils/fairUtils';

const TABLE_NAME = 'products';

export async function createProducts(product: Product) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `image`, `price`, `currency`, `description`, `title`, `category`, `store`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,  NOW(), NOW(), NULL)',
            [
                product.getUuid(),
                product.getImage(),
                product.getPrice(),
                product.getCurrency(),
                product.getDescription(),
                product.getTitle(),
                product.getCategory(),
                product.getStore(),
                product.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(product: Product) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `image` = ?, `price` = ?, `currency` = ?, `description` = ?, `title` = ?, `category` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(product.getImage()) ?? '',
                safe(product.getPrice()) ?? '',
                safe(product.getCurrency()) ?? '',
                safe(product.getDescription()) ?? '',
                safe(product.getTitle()) ?? '',
                safe(product.getCategory()) ?? '',
                product.getUuid()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteProduct(uuid: string) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `deletedAt` = NOW() WHERE `uuid` = ?',
            [uuid]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getProduct(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return ProductsFactory.createProduct({
                uuid: rows[0].uuid,
                image: rows[0].image,
                price: rows[0].price,
                currency: rows[0].currency,
                description: rows[0].description,
                title: rows[0].title,
                category: rows[0].category,
                store: rows[0].store,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getProductsByStore(storeUuid: string) {
    try {
        const [results] = await db.query(
            `
            SELECT 
                p.uuid,
                p.image,
                p.price,
                p.currency,
                p.description,
                p.title,
                p.store,
                c.uuid AS category_uuid,
                c.name AS category_name
            FROM products p
            LEFT JOIN products_categories c 
                ON p.category = c.uuid
            WHERE p.deletedAt IS NULL 
              AND p.store = ?
            `,
            [storeUuid]
        );

        const rows = results as RowDataPacket[];

        // 🔹 Agrupar por nombre de categoría
        const grouped: Record<string, any[]> = {};

        for (const row of rows) {
            const product = {
                uuid: row.uuid,
                image: row.image,
                price: row.price,
                currency: row.currency,
                description: row.description,
                title: row.title,
                category: row.category_uuid,
                categoryUuid: row.category_uuid,
                categoryName: row.category_name || "Sin categoría",
                store: row.store
            };

            if (!grouped[product.categoryName]) {
                grouped[product.categoryName] = [];
            }
            grouped[product.categoryName].push(product);
        }

        return grouped;
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}


