import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import ArticlesFactory from '../articlesFactory';
import Articles from '../model/articles';

const TABLE_NAME = 'articles';

export async function createArticles(articles: Articles) {
    try {
        const [results, fields] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `description`, `name`, `imagen`, `url`, `category`,  `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                articles.getUuid(),
                articles.getDescription(),
                articles.getName(),
                articles.getImagen(),
                articles.getUrl(),
                articles.getCategory(),
                articles.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(articles: Articles) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `name` = ?, `description` = ?, `imagen` = ?, `url` = ?, `category` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                articles.getName(),
                articles.getDescription(),
                articles.getImagen(),
                articles.getUrl(),
                articles.getCategory(),
                articles.getUuid()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteArticles(uuid: string) {
    try {
        const [results, fields] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `deletedAt` = NOW() WHERE `uuid` = ?',
            [uuid]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getArticle(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return ArticlesFactory.createArticles({
                uuid: rows[0].uuid,
                description: rows[0].description,
                name: rows[0].name,
                imagen: rows[0].imagen,
                url: rows[0].url,
                category: rows[0].category,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function getArticles(fair: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE  `fair` = ? AND `deletedAt` IS NULL',
            [fair]
        );

        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            return rows.map((row: any) => ArticlesFactory.createArticles({
                uuid: row.uuid,
                description: row.description,
                name: row.name,
                imagen: row.imagen,
                url: row.url,
                category: row.category,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
