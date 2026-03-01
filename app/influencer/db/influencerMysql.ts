import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import InfluencerFactory from '../influencerFactory';
import Influencer from '../model/influencer';
import { safe } from '../../utils/fairUtils';

const TABLE_NAME = 'influencer';

export async function createInfluencer(influencer: Influencer) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `link`, `redirection`, `name`, `email`, `fair`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                influencer.getUuid(),
                influencer.getLink(),
                influencer.getRedirection(),
                influencer.getName(),
                influencer.getEmail(),
                influencer.getFair()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(influencer: Influencer) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `link` = ?, `redirection` = ? , `name`= ? , `email` = ?,  `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                safe(influencer.getLink()) ?? '',
                safe(influencer.getRedirection()) ?? '',
                safe(influencer.getName()) ?? '',
                safe(influencer.getEmail()) ?? '',
                influencer.getUuid()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteInfluencer(uuid: string) {
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

export async function getInfluencerByLink(link: string): Promise<Influencer | null> {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `link` = ? AND `deletedAt` IS NULL LIMIT 1',
            [link]
        );
        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            return InfluencerFactory.createInfluencer({
                uuid: rows[0].uuid,
                name: rows[0].name,
                email: rows[0].email,
                link: rows[0].link,
                redirection: rows[0].redirection,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getInfluencer(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );
        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return InfluencerFactory.createInfluencer({
                uuid: rows[0].uuid,
                name: rows[0].name,
                email: rows[0].email,
                link: rows[0].link,
                redirection: rows[0].redirection,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getInfluencers(fair: string) {
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
            return rows.map((row: any) => InfluencerFactory.createInfluencer({
                uuid: row.uuid,
                name: row.name,
                email: row.email,
                link: row.link,
                redirection: row.redirection,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}

export async function incrementViews(influencerUuid: string): Promise<void> {
    try {
        const today = new Date().toISOString().slice(0, 10);
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `views` = COALESCE(`views`, 0) + 1 WHERE `uuid` = ?',
            [influencerUuid]
        );
        await db.query(
            `INSERT INTO influencer_views_daily (influencer_uuid, view_date, count)
             VALUES (?, ?, 1)
             ON DUPLICATE KEY UPDATE count = count + 1`,
            [influencerUuid, today]
        );
    } catch (err) {
        console.error("Error incrementing views:", err);
        throw err;
    }
}

export async function getInfluencerViews(uuid: string): Promise<{ totalViews: number; dailyViews: { date: string; count: number }[] } | null> {
    try {
        const [totalRows] = await db.query(
            'SELECT COALESCE(views, 0) as views FROM `' + TABLE_NAME + '` WHERE uuid = ? AND deletedAt IS NULL',
            [uuid]
        );
        const total = (totalRows as RowDataPacket[])[0]?.views ?? 0;

        const [dailyRows] = await db.query(
            `SELECT view_date as date, count FROM influencer_views_daily
             WHERE influencer_uuid = ? AND view_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
             ORDER BY view_date ASC`,
            [uuid]
        );
        const dailyViews = (dailyRows as RowDataPacket[]).map((r: any) => ({
            date: r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date),
            count: Number(r.count)
        }));

        return { totalViews: Number(total), dailyViews };
    } catch (err) {
        console.error("Error getting influencer views:", err);
        throw err;
    }
}

