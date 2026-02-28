import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import BannerPublicityViewsFactory from '../bannerPublicityViewsFactory';
import BannerPublicityViews from '../model/bannerPublicityViews';

const TABLE_NAME = 'banner_publicity_views';

export async function createBannerPublicityViews(bannerPublicityViews: BannerPublicityViews) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `banner`, `views`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, NOW(), NOW(), NULL)',
            [bannerPublicityViews.getUuid(), bannerPublicityViews.getBanner(), bannerPublicityViews.getViews()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(bannerPublicityViews: BannerPublicityViews) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [bannerPublicityViews.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteBannerPublicityViews(uuid: string) {
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

export async function getBannerPublicityViews(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return BannerPublicityViewsFactory.createBannerPublicityViews({
                uuid: rows[0].uuid,
                banner: rows[0].banner,
                views: rows[0].views
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getBannersPublicityViews() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => BannerPublicityViewsFactory.createBannerPublicityViews({
                uuid: row.uuid,
                banner: row.banner,
                views: row.views
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

