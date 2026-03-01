import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import GiveawaysFactory from '../giveawaysFactory';
import Giveaways from '../model/giveaways';

const TABLE_NAME = 'giveaways';

// Si la tabla no tiene picture/description: ALTER TABLE giveaways ADD COLUMN picture VARCHAR(500) DEFAULT '', ADD COLUMN description TEXT;

export async function createGiveaways(giveaways: Giveaways) {
    try {
        await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `date`, `hour`, `name`, `fair`, `picture`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                giveaways.getUuid(),
                giveaways.getDate(),
                giveaways.getHour(),
                giveaways.getName(),
                giveaways.getFair(),
                giveaways.getPicture(),
                giveaways.getDescription()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

const safe = (v: any) => (v === undefined ? null : v);

export async function update(giveaways: Giveaways) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `date` = ?, `hour` = ?, `name` = ?, `picture` = ?, `description` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(giveaways.getDate()) ?? '',
                safe(giveaways.getHour()) ?? '',
                safe(giveaways.getName()) ?? '',
                safe(giveaways.getPicture()) ?? '',
                safe(giveaways.getDescription()) ?? '',
                giveaways.getUuid()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteGiveaways(uuid: string) {
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

export async function getGiveawaysByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return GiveawaysFactory.createGiveaways({
                uuid: rows[0].uuid,
                date: rows[0].date,
                hour: rows[0].hour,
                name: rows[0].name,
                fair: rows[0].fair,
                picture: rows[0].picture,
                description: rows[0].description
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function getGiveaways(fair: string) {
    try {
        if (fair == null || fair === undefined || (typeof fair === 'string' && !fair.trim())) {
            return [];
        }
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL AND `fair` = ?',
            [fair]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => GiveawaysFactory.createGiveaways({
                uuid: row.uuid,
                date: row.date,
                hour: row.hour,
                name: row.name,
                fair: row.fair,
                picture: row.picture,
                description: row.description
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
