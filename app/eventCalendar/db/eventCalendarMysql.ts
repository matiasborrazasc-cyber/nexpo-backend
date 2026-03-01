import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import EventCalendarFactory from '../eventCalendarFactory';
import EventCalendar from '../model/eventCalendar';

const TABLE_NAME = 'event_calendar';

export async function createEventCalendar(eventCalendar: EventCalendar) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `place`, `date`, `hour`, `name`, `link`, `description`, `picture`, `people`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  NOW(), NOW(), NULL)',
            [
                eventCalendar.getUuid(),
                eventCalendar.getPlace(),
                eventCalendar.getDate(),
                eventCalendar.getHour(),
                eventCalendar.getName(),
                eventCalendar.getLink(),
                eventCalendar.getDescription(),
                eventCalendar.getPicture(),
                eventCalendar.getPeople(),
                eventCalendar.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

const safe = (v: any) => (v === undefined ? null : v);

export async function update(eventCalendar: EventCalendar) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `date` = ?, `hour` = ?, `name` = ?, `link` = ?, `description` = ?, `picture` = ?, `people` = ?, `place` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(eventCalendar.getDate()) ?? '',
                safe(eventCalendar.getHour()) ?? '',
                safe(eventCalendar.getName()) ?? '',
                safe(eventCalendar.getLink()) ?? '',
                safe(eventCalendar.getDescription()) ?? '',
                safe(eventCalendar.getPicture()) ?? '',
                safe(eventCalendar.getPeople()) ?? '',
                safe(eventCalendar.getPlace()) ?? '',
                eventCalendar.getUuid()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteEventCalendar(uuid: string) {
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

export async function getEventCalendar(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return EventCalendarFactory.createEventCalendar({
                uuid: rows[0].uuid,
                date: rows[0].date,
                hour: rows[0].hour,
                name: rows[0].name,
                link: rows[0].link,
                description: rows[0].description,
                picture: rows[0].picture,
                people: rows[0].people,
                fair: rows[0].fair,
                place: rows[0].place
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getEventCalendars(fair: string) {
    try {
        if (fair == null || fair === undefined || (typeof fair === 'string' && !fair.trim())) {
            return [];
        }
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE fair = ? AND `deletedAt` IS NULL',
            [fair]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => EventCalendarFactory.createEventCalendar({
                uuid: row.uuid,
                date: row.date,
                hour: row.hour,
                name: row.name,
                link: row.link,
                description: row.description,
                picture: row.picture,
                people: row.people,
                fair: row.fair,
                place: row.place
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
