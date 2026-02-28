import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import CategoriesArticlesFactory from '../categoriesArticlesFactory';
import CategoriesArticles from '../model/categoriesArticles';
const TABLE_NAME = 'categories_articles';

export async function createCategoriesArticles(categoriesArticles: CategoriesArticles) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `name`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?,  NOW(), NOW(), NULL)',
            [categoriesArticles.getUuid(), categoriesArticles.getName(), categoriesArticles.getFair()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(categoriesArticles: CategoriesArticles) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [categoriesArticles.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteCategoriesArticles(uuid: string) {
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

export async function getCategoryArticles(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );
        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return CategoriesArticlesFactory.createCategoriesArticles({
                uuid: rows[0].uuid,
                name: rows[0].name,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getCategoriesArticles() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );
        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => CategoriesArticlesFactory.createCategoriesArticles({
                uuid: row.uuid,
                name: row.name,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
