import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import MatchUsersFactory from '../matchUsersFactory';
import MatchUsers from '../model/matchUsers';

const TABLE_NAME = 'match_users';

export async function createMatchUsers(matchUsers: MatchUsers) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `status`, `userSend`, `userReceive`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                matchUsers.getUuid(),
                matchUsers.getStatus(),
                matchUsers.getUserSend(),
                matchUsers.getUserReceive(),
                matchUsers.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(matchUsers: MatchUsers) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `status` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [matchUsers.getStatus(), matchUsers.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteMatchUsers(uuid: string) {
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

export async function getMatchUsersByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return MatchUsersFactory.createMatchUsers({
                uuid: rows[0].uuid,
                userSend: rows[0].userSend,
                userReceive: rows[0].userReceive,
                fair: rows[0].fair,
                status: rows[0].status
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getMatchUsers() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => MatchUsersFactory.createMatchUsers({
                uuid: row.uuid,
                userSend: row.userSend,
                userReceive: row.userReceive,
                fair: row.fair,
                status: row.status
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

/** Invitaciones enviadas por el usuario (userSend = current user), filtrado por feria. */
export async function getMatchUsersByUserSend(userSend: string, fair: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `userSend` = ? AND `fair` = ? AND `deletedAt` IS NULL',
            [userSend, fair]
        );
        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            return rows.map((row: any) => MatchUsersFactory.createMatchUsers({
                uuid: row.uuid,
                userSend: row.userSend,
                userReceive: row.userReceive,
                fair: row.fair,
                status: row.status
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

/** Invitaciones recibidas por el usuario (userReceive = me), con nombre del que envía. Solo pending. Filtrado por feria. */
export async function getReceivedWithSenderInfo(userReceive: string, fair: string): Promise<Array<{ uuid: string; userSend: string; userReceive: string; status: string; senderName: string; senderEmail: string }>> {
    try {
        const [results] = await db.query(
            `SELECT m.uuid, m.userSend, m.userReceive, m.status, u.name AS senderName, u.email AS senderEmail
             FROM \`${TABLE_NAME}\` m
             JOIN users u ON u.uuid = m.userSend AND u.deletedAt IS NULL
             WHERE m.userReceive = ? AND m.fair = ? AND m.deletedAt IS NULL AND (m.status = 'pending' OR m.status IS NULL)
             ORDER BY m.createdAt DESC`,
            [userReceive, fair]
        );
        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ({
            uuid: row.uuid,
            userSend: row.userSend,
            userReceive: row.userReceive,
            status: row.status || 'pending',
            senderName: row.senderName ?? 'Sin nombre',
            senderEmail: row.senderEmail ?? ''
        }));
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

/** Conexiones aceptadas (status = accepted): el otro usuario con su nombre. Para mostrar en Chats. Filtrado por feria. */
export async function getAcceptedConnections(myUuid: string, fair: string): Promise<Array<{ contactUuid: string; contactName: string }>> {
    try {
        const [results] = await db.query(
            `SELECT m.userSend, m.userReceive, u.name AS contactName
             FROM \`${TABLE_NAME}\` m
             JOIN users u ON u.uuid = (CASE WHEN m.userSend = ? THEN m.userReceive ELSE m.userSend END) AND u.deletedAt IS NULL
             WHERE (m.userSend = ? OR m.userReceive = ?) AND m.fair = ? AND m.deletedAt IS NULL AND m.status = 'accepted'
             ORDER BY u.name`,
            [myUuid, myUuid, myUuid, fair]
        );
        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ({
            contactUuid: row.userSend === myUuid ? row.userReceive : row.userSend,
            contactName: row.contactName ?? 'Sin nombre'
        }));
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

/** Invitaciones enviadas por el usuario con nombre del que recibe. Incluye pending. Filtrado por feria. */
export async function getSentWithReceiverInfo(userSend: string, fair: string): Promise<Array<{ uuid: string; userSend: string; userReceive: string; status: string; receiverName: string; receiverEmail: string }>> {
    try {
        const [results] = await db.query(
            `SELECT m.uuid, m.userSend, m.userReceive, m.status, u.name AS receiverName, u.email AS receiverEmail
             FROM \`${TABLE_NAME}\` m
             JOIN users u ON u.uuid = m.userReceive AND u.deletedAt IS NULL
             WHERE m.userSend = ? AND m.fair = ? AND m.deletedAt IS NULL
             ORDER BY m.createdAt DESC`,
            [userSend, fair]
        );
        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ({
            uuid: row.uuid,
            userSend: row.userSend,
            userReceive: row.userReceive,
            status: row.status || 'pending',
            receiverName: row.receiverName ?? 'Sin nombre',
            receiverEmail: row.receiverEmail ?? ''
        }));
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
