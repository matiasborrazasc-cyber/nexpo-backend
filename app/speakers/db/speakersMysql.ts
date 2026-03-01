import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Speakers from '../model/speakers';
import SpeakersFactory from '../speakersFactory';

const TABLE_NAME = 'speakers';

export async function createSpeakers(speakers: Speakers) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`,`name`, `email`, `whatsapp`, `instagram`, `twitter`, `picture`, `description`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                speakers.getUuid(),
                speakers.getName(),
                speakers.getEmail(),
                speakers.getWhatsapp(),
                speakers.getInstagram(),
                speakers.getTwitter(),
                speakers.getPicture(),
                speakers.getDescription(),
                speakers.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

const safe = (v: any) => (v === undefined ? null : v);

export async function update(speakers: Speakers) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `name` = ?, `email` = ?, `whatsapp` = ?, `instagram` = ?, `twitter` = ?, `picture` = ?, `description` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(speakers.getName()) ?? '',
                safe(speakers.getEmail()) ?? '',
                safe(speakers.getWhatsapp()) ?? '',
                safe(speakers.getInstagram()) ?? '',
                safe(speakers.getTwitter()) ?? '',
                safe(speakers.getPicture()) ?? '',
                safe(speakers.getDescription()) ?? '',
                speakers.getUuid()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteSpeaker(uuid: string) {
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

export async function getSpeaker(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );
        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return SpeakersFactory.createSpeaker({
                uuid: rows[0].uuid,
                name: rows[0].name,
                picture: rows[0].picture,
                email: rows[0].email,
                whatsapp: rows[0].whatsapp,
                instagram: rows[0].instagram,
                twitter: rows[0].twitter,
                description: rows[0].description,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getSpeakers(fair: string) {
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
            return rows.map((row: any) => SpeakersFactory.createSpeaker({
                uuid: row.uuid,
                name: row.name,
                picture: row.picture,
                email: row.email,
                whatsapp: row.whatsapp,
                instagram: row.instagram,
                twitter: row.twitter,
                description: row.description,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
