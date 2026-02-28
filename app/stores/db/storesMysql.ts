import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Stores from '../model/stores';
import StoresFactory from '../storesFactory';

const TABLE_NAME = 'stores';

export async function createStores(stores: Stores) {
    try {

        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `name`, `description`, `portada`, `image`, `email`, `whatsapp`, `instagram`, `facebook`, `user`, `category`, `typeOfStand`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL) ON DUPLICATE KEY UPDATE `updatedAt` = NOW()',
            [
                stores.getUuid(),
                stores.getName(),
                stores.getDescription(),
                stores.getPortada(),
                stores.getImage(),
                stores.getEmail(),
                stores.getWhatsapp(),
                stores.getInstagram(),
                stores.getFacebook(),
                stores.getUser(),
                stores.getCategory(),
                stores.getTypeOfStand(),
                stores.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(stores: Stores) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `name` = ?, `description` = ?, `portada` = ?, `image` = ?, `email` = ?, `whatsapp` = ?, `instagram` = ?, `facebook` = ?, `user` = ?, `category` = ?, `typeOfStand` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                stores.getName(),
                stores.getDescription(),
                stores.getPortada(),
                stores.getImage(),
                stores.getEmail(),
                stores.getWhatsapp(),
                stores.getInstagram(),
                stores.getFacebook(),
                stores.getUser(),
                stores.getCategory(),
                stores.getTypeOfStand(),
                stores.getUuid()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteStores(uuid: string) {
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

export async function getStore(uuid: string, fair: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND  `fair` = ? AND `deletedAt` IS NULL',
            [uuid, fair]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return StoresFactory.createStores({
                uuid: rows[0].uuid,
                name: rows[0].name,
                description: rows[0].description,
                portada: rows[0].portada,
                image: rows[0].image,
                email: rows[0].email,
                whatsapp: rows[0].whatsapp,
                instagram: rows[0].instagram,
                facebook: rows[0].facebook,
                user: rows[0].user,
                category: rows[0].category,
                typeOfStand: rows[0].typeOfStand,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getStores(fair: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE fair = ? AND `deletedAt` IS NULL',
            [fair]
        );

        const rows = results as RowDataPacket[];


        if (rows.length > 0) {
            return rows.map((row: any) => StoresFactory.createStores({
                uuid: row.uuid,
                name: row.name,
                description: row.description,
                portada: row.portada,
                image: row.image,
                email: row.email,
                whatsapp: row.whatsapp,
                instagram: row.instagram,
                facebook: row.facebook,
                user: row.user,
                category: row.category,
                typeOfStand: row.typeOfStand,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
