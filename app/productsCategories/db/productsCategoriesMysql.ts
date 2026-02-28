import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import ProductsCategories from '../model/productsCategories';
import ProductsCategoriesFactory from '../productsCategoriesFactory';

const TABLE_NAME = 'products_categories';

export async function createProductsCategories(productsCategories: ProductsCategories) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`,`name`, `store`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?,  NOW(), NOW(), NULL)',
            [
                productsCategories.getUuid(),
                productsCategories.getName(),
                productsCategories.getStore(),
                productsCategories.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(productsCategories: ProductsCategories) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [productsCategories.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteProductCategories(uuid: string) {
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

export async function getProductCategoriesByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );
        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return ProductsCategoriesFactory.createProductCategories({
                uuid: rows[0].uuid,
                name: rows[0].name,
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

export async function getProductCategories() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => ProductsCategoriesFactory.createProductCategories({
                uuid: row.uuid,
                name: row.name,
                store: row.store,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

export async function getProductCategoriesByStore(storeUuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `store` = ? AND `deletedAt` IS NULL',
            [storeUuid]
        );
        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ProductsCategoriesFactory.createProductCategories({
            uuid: row.uuid,
            name: row.name,
            store: row.store,
            fair: row.fair
        }));
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
