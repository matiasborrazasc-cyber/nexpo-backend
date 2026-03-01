import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Sponsors from '../model/sponsors';
import SponsorsFactory from '../sponsorsFactory';

const TABLE_NAME = 'sponsors';

// Si la tabla ya existía sin description/image, ejecutar:
// ALTER TABLE sponsors ADD COLUMN description VARCHAR(2000) DEFAULT '';
// ALTER TABLE sponsors ADD COLUMN image VARCHAR(500) DEFAULT '';

export async function createSponsors(sponsors: Sponsors) {
    try {
        await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `phone`, `name`, `description`, `image`, `email`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                sponsors.getUuid(),
                sponsors.getPhone(),
                sponsors.getName(),
                sponsors.getDescription(),
                sponsors.getImage(),
                sponsors.getEmail(),
                sponsors.getFair()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

const safe = (v: any) => (v === undefined ? null : v);

export async function update(sponsors: Sponsors) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `name` = ?, `description` = ?, `image` = ?, `email` = ?, `phone` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(sponsors.getName()) ?? '',
                safe(sponsors.getDescription()) ?? '',
                safe(sponsors.getImage()) ?? '',
                safe(sponsors.getEmail()) ?? '',
                safe(sponsors.getPhone()) ?? '',
                sponsors.getUuid()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteSponsors(uuid: string) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `deletedAt` = NOW() WHERE `uuid` = ?',
            [uuid]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getSponsor(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );
        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            const row = rows[0];
            return SponsorsFactory.createSponsor({
                uuid: row.uuid,
                name: row.name,
                description: row.description ?? '',
                image: row.image ?? '',
                email: row.email,
                phone: row.phone,
                fair: row.fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getSponsors(fair: string) {
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
            return rows.map((row: any) => SponsorsFactory.createSponsor({
                uuid: row.uuid,
                name: row.name,
                description: row.description ?? '',
                image: row.image ?? '',
                email: row.email,
                phone: row.phone,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
