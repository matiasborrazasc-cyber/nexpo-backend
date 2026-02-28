import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import MessagesFactory from '../messagesFactory';
import Messages from '../model/messages';

const TABLE_NAME = 'messages';

export async function createMessages(messages: Messages) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `userSend`, `userReceive`, `message`, `date`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                messages.getUuid(),
                messages.getUserSend(),
                messages.getUserReceive(),
                messages.getMessage(),
                messages.getDate(),
                messages.getStatus()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(messages: Messages) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [messages.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteMessages(uuid: string) {
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

export async function getMessagesByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return MessagesFactory.createMessages({
                uuid: rows[0].uuid,
                userSend: rows[0].userSend,
                userReceive: rows[0].userReceive,
                message: rows[0].message,
                date: rows[0].date,
                status: rows[0].status,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getMessages() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => MessagesFactory.createMessages({
                uuid: row.uuid,
                userSend: row.userSend,
                userReceive: row.userReceive,
                message: row.message,
                date: row.date,
                status: row.status,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

/** Mensajes entre dos usuarios (para el chat), ordenados por fecha. */
export async function getMessagesBetween(userA: string, userB: string) {
    try {
        const [results] = await db.query(
            `SELECT * FROM \`${TABLE_NAME}\` WHERE \`deletedAt\` IS NULL
             AND ((\`userSend\` = ? AND \`userReceive\` = ?) OR (\`userSend\` = ? AND \`userReceive\` = ?))
             ORDER BY \`date\` ASC`,
            [userA, userB, userB, userA]
        );
        const rows = results as RowDataPacket[];
        return rows.length > 0
            ? rows.map((row: any) => MessagesFactory.createMessages({
                uuid: row.uuid,
                userSend: row.userSend,
                userReceive: row.userReceive,
                message: row.message,
                date: row.date,
                status: row.status,
                fair: row.fair
            }))
            : [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

/** Lista de conversaciones del usuario: contacto + último mensaje. */
export async function getConversationsWithLastMessage(myUuid: string): Promise<Array<{ contactUuid: string; contactName: string; lastMessage: string; lastMessageDate: string }>> {
    try {
        const [results] = await db.query(
            `SELECT m.contactUuid, m.lastMessage, m.lastMessageDate, u.name AS contactName
FROM (
  SELECT
    CASE WHEN userSend = ? THEN userReceive ELSE userSend END AS contactUuid,
    message AS lastMessage,
    \`date\` AS lastMessageDate
  FROM \`${TABLE_NAME}\` a
  WHERE (a.userSend = ? OR a.userReceive = ?) AND a.deletedAt IS NULL
  AND a.date = (
    SELECT MAX(b.date) FROM \`${TABLE_NAME}\` b
    WHERE b.deletedAt IS NULL
    AND ((b.userSend = ? AND b.userReceive = (CASE WHEN a.userSend = ? THEN a.userReceive ELSE a.userSend END))
      OR (b.userReceive = ? AND b.userSend = (CASE WHEN a.userSend = ? THEN a.userReceive ELSE a.userSend END)))
  )
) m
JOIN users u ON u.uuid = m.contactUuid AND u.deletedAt IS NULL
GROUP BY m.contactUuid, m.lastMessage, m.lastMessageDate, u.name
ORDER BY m.lastMessageDate DESC`,
            [myUuid, myUuid, myUuid, myUuid, myUuid, myUuid, myUuid]
        );
        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ({
            contactUuid: row.contactUuid,
            contactName: row.contactName ?? 'Sin nombre',
            lastMessage: row.lastMessage ?? '',
            lastMessageDate: row.lastMessageDate ?? ''
        }));
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
