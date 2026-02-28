import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import CommentsEventCalendarFactory from '../commentsEventCalendarFactory';
import CommentsEventCalendar from '../model/commentsEventCalendar';

const TABLE_NAME = 'comments_event_calendar';

export async function createCommentsEventCalendar(commentsEventCalendar: CommentsEventCalendar) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `comment`, `user`, `event`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                commentsEventCalendar.getUuid(),
                commentsEventCalendar.getComment(),
                commentsEventCalendar.getUser(),
                commentsEventCalendar.getEvent()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(commentsEventCalendar: CommentsEventCalendar) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [commentsEventCalendar.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteCommentsEventCalendar(uuid: string) {
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

export async function getCommentEventCalendar(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return CommentsEventCalendarFactory.createCommentsEventCalendar({
                uuid: rows[0].uuid,
                comment: rows[0].comment,
                user: rows[0].user,
                event: rows[0].event
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getCommentsEventCalendar() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );
        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => CommentsEventCalendarFactory.createCommentsEventCalendar({
                uuid: row.uuid,
                comment: row.comment,
                user: row.user,
                event: row.event
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
