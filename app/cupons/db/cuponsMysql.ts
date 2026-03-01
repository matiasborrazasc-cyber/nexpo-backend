import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Cupons from '../model/cupons';
import CuponsFactory from '../cuponsFactory';

const TABLE_NAME = 'cupons';

export async function createCupons(cupons: Cupons) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`,  `description`, `title`, `picture`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?,   NOW(), NOW(), NULL)',
            [
                cupons.getUuid(),
                cupons.getDescription(),
                cupons.getTitle(),
                cupons.getPicture(),
                cupons.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

const safe = (v: any) => (v === undefined ? null : v);

export async function update(cupons: Cupons) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `description` = ?, `title` = ?, `picture` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(cupons.getDescription()) ?? '',
                safe(cupons.getTitle()) ?? '',
                safe(cupons.getPicture()) ?? '',
                cupons.getUuid()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteCupons(uuid: string) {
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

export async function getCupon(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return CuponsFactory.createCupons({
                uuid: rows[0].uuid,
                description: rows[0].description,
                title: rows[0].title,
                picture: rows[0].picture,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getCupons(fair: string) {
    try {
        if (fair == null || fair === undefined || (typeof fair === 'string' && !fair.trim())) {
            return [];
        }
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `fair` = ? AND `deletedAt` IS NULL',
            [fair]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => CuponsFactory.createCupons({
                uuid: row.uuid,
                description: row.description,
                title: row.title,
                picture: row.picture,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
