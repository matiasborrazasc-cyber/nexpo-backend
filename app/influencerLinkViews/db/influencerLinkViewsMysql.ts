import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import InfluencerLinkViewsFactory from '../influencerLinkViewsFactory';
import InfluencerLinkViews from '../model/influencerLinkViews';

const TABLE_NAME = 'influencer_link_views';

export async function createInfluencerLinkViews(influencerLinkViews: InfluencerLinkViews) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `views`, `link`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, NOW(), NOW(), NULL)',
            [
                influencerLinkViews.getUuid(),
                influencerLinkViews.getViews(),
                influencerLinkViews.getLink()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(influencerLinkViews: InfluencerLinkViews) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [influencerLinkViews.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteInfluencerLinkViews(uuid: string) {
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

export async function getInfluencerLinkViews(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return InfluencerLinkViewsFactory.createInfluencerLinkViews({
                uuid: rows[0].uuid,
                views: rows[0].views,
                link: rows[0].link
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getInfluencersLinksViews() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => InfluencerLinkViewsFactory.createInfluencerLinkViews({
                uuid: row.uuid,
                views: row.views,
                link: row.link
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database:", err);
        throw err;
    }
}
