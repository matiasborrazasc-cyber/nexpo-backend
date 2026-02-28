import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Admin from '../model/admin';
import AdminFactory from '../adminFactory';

const TABLE_NAME = 'admin';

export async function createAdmin(admin: Admin) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `name`, `email`, `role`, `fair`, `password`,`createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?,  NOW(), NOW(), NULL)',
            [
                admin.getUuid(),
                admin.getName(),
                admin.getEmail(),
                admin.getRole(),
                admin.getFair(),
                admin.getPassword()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(admin: Admin) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [admin.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteAdmin(uuid: string) {
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

export async function getAdminByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return AdminFactory.createAdmin({
                uuid: rows[0].uuid,
                name: rows[0].name,
                email: rows[0].email,
                role: rows[0].role,
                password: rows[0].password,
                fair: rows[0].fair
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getAdmin() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE  `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => AdminFactory.createAdmin({
                uuid: row.uuid,
                name: row.name,
                email: row.email,
                role: row.role,
                password: row.password,
                fair: row.fair
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getAdminByEmail(email: string) {
    try {
        const [results] = await db.query(
            `
            SELECT a.*, f.uuid as fairUuid, f.name as fairName
            FROM ${TABLE_NAME} a
            LEFT JOIN fair f ON a.fair = f.uuid
            WHERE a.email = ? AND a.deletedAt IS NULL
            `,
            [email]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return AdminFactory.createAdmin({
                uuid: rows[0].uuid,
                name: rows[0].name,
                email: rows[0].email,
                role: rows[0].role,
                password: rows[0].password,
                fair: {
                    uuid: rows[0].fairUuid,
                    name: rows[0].fairName
                }
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}