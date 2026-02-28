import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import GiveawaysWinnersFactory from '../giveawaysWinnersFactory';
import GiveawaysWinners from '../model/giveawaysWinners';

const TABLE_NAME = 'giveaways_winners';

export async function createGiveawaysWinners(giveawaysWinners: GiveawaysWinners) {
    try {
        const [results, fields] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `giveaways`, `user`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, NOW(), NOW(), NULL)',
            [
                giveawaysWinners.getUuid(),
                giveawaysWinners.getGiveaways(),
                giveawaysWinners.getUser()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(giveawaysWinners: GiveawaysWinners) {
    try {
        const [results, fields] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [giveawaysWinners.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteGiveaways(uuid: string) {
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

export async function getGiveawaysWinnersByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return GiveawaysWinnersFactory.createGiveawaysWinners({
                uuid: rows[0].uuid,
                giveaways: rows[0].giveaways,
                user: rows[0].user,
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getGiveawaysWinners() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL',
            []
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => GiveawaysWinnersFactory.createGiveawaysWinners({
                uuid: row.uuid,
                giveaways: row.giveaways,
                user: row.user
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
} 