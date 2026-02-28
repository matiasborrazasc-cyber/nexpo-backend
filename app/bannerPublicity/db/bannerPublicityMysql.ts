import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import BannerPublicityFactory from '../bannerPublicityFactory';
import BannerPublicity from '../model/bannerPublicity';

const TABLE_NAME = 'banner_publicity';

export async function createBannerPublicity(bannerPublicity: BannerPublicity) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`,`name`,  `sponsor`, `url`, `fair`, `section`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                bannerPublicity.getUuid(),
                bannerPublicity.getName(),
                bannerPublicity.getSponsor(),
                bannerPublicity.getUrl(),
                bannerPublicity.getFair(),
                bannerPublicity.getSection(),
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(bannerPublicity: BannerPublicity) {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `name` = ?, `url` = ?, `section` = ?, `sponsor` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                bannerPublicity.getName(),
                bannerPublicity.getUrl(),
                bannerPublicity.getSection(),
                bannerPublicity.getSponsor(),
                bannerPublicity.getUuid()
            ]
        );
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteBannerPublicity(uuid: string) {
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

export async function getBannerPublicity(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return BannerPublicityFactory.createBannerPublicity({
                uuid: rows[0].uuid,
                url: rows[0].url,
                section: rows[0].section,
                fair: rows[0].fair,
                sponsor: rows[0].sponsor,
                name: rows[0].name,
                views: rows[0].views ?? 0
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getBannersPublicity(fair: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `fair` = ? AND `deletedAt` IS NULL',
            [fair]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => BannerPublicityFactory.createBannerPublicity({
                uuid: row.uuid,
                url: row.url,
                section: row.section,
                fair: row.fair,
                sponsor: row.sponsor,
                name: row.name,
                views: row.views ?? 0
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getBannersPublicityBySection(fair: string, section: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `fair` = ? AND `section` = ? AND `deletedAt` IS NULL ORDER BY `createdAt` DESC',
            [fair, section]
        );
        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            return rows.map((row: any) => BannerPublicityFactory.createBannerPublicity({
                uuid: row.uuid,
                url: row.url,
                section: row.section,
                fair: row.fair,
                sponsor: row.sponsor,
                name: row.name,
                views: row.views ?? 0
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function incrementBannerViews(uuid: string): Promise<void> {
    try {
        await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `views` = COALESCE(`views`, 0) + 1 WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );
    } catch (err) {
        console.error("Error incrementing banner views:", err);
        throw err;
    }
}