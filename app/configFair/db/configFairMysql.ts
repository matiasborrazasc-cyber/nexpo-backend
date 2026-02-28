import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import ConfigFairFactory from '../configFairFactory';
import ConfigFair from '../model/configFair';

const TABLE_NAME = 'config_fair';

export async function createConfigFair(configFair: ConfigFair) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?,  NOW(), NOW(), NULL)',
            [configFair.getUuid(), configFair.getFair()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(configFair: ConfigFair) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [configFair.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteConfigFair(uuid: string) {
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

export async function getConfigFair(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return ConfigFairFactory.createConfigFair({
                uuid: rows[0].uuid,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
} 