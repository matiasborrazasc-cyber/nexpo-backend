import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';

const TABLE_NAME = 'fair_config';

export async function getFirstConfig() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` LIMIT 1'
        );
        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            return {
                fairUuid: rows[0].fair_uuid,
                primaryColor: rows[0].primary_color || '#6840FF',
            };
        }
        return null;
    } catch (err) {
        console.error('Error getFirstConfig:', err);
        throw err;
    }
}

export async function getConfig(fairUuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `fair_uuid` = ?',
            [fairUuid]
        );
        const rows = results as RowDataPacket[];
        if (rows.length > 0) {
            return {
                fairUuid: rows[0].fair_uuid,
                primaryColor: rows[0].primary_color || '#6840FF',
            };
        }
        return null;
    } catch (err) {
        console.error('Error getConfig:', err);
        throw err;
    }
}

export async function upsertConfig(fairUuid: string, primaryColor: string) {
    try {
        await db.query(
            `INSERT INTO \`${TABLE_NAME}\` (\`fair_uuid\`, \`primary_color\`) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE \`primary_color\` = ?, \`updated_at\` = NOW()`,
            [fairUuid, primaryColor, primaryColor]
        );
    } catch (err) {
        console.error('Error upsertConfig:', err);
        throw err;
    }
}
