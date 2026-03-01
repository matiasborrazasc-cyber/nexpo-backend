import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Users from '../model/users';
import UsersFactory from '../usersFactory';

const TABLE_NAME = 'users';

export async function createUsers(users: Users) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `name`, `email`, `role`, `password`, `picture`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                users.getUuid(),
                users.getName(),
                users.getEmail(),
                users.getRole(),
                users.getPassword(),
                users.getPicture(),
                users.getDescription()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(users: Users) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [users.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

/** Actualiza nombre, descripción y/o picture del usuario por uuid. */
export async function updateProfile(uuid: string, data: { name?: string; description?: string | null; picture?: string | null }) {
    try {
        const updates: string[] = [];
        const values: any[] = [];
        if (data.name !== undefined) {
            updates.push(data.name === null ? '`name` = NULL' : '`name` = ?');
            if (data.name !== null) values.push(data.name);
        }
        if (data.description !== undefined) {
            updates.push(data.description === null ? '`description` = NULL' : '`description` = ?');
            if (data.description !== null) values.push(data.description);
        }
        if (data.picture !== undefined) {
            updates.push(data.picture === null ? '`picture` = NULL' : '`picture` = ?');
            if (data.picture !== null) values.push(data.picture);
        }
        if (updates.length === 0) return null;
        updates.push('`updatedAt` = NOW()');
        values.push(uuid);
        const [results] = await db.query(
            `UPDATE \`${TABLE_NAME}\` SET ${updates.join(', ')} WHERE \`uuid\` = ? AND \`deletedAt\` IS NULL`,
            values
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteUsers(uuid: string) {
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

export async function getUser(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return UsersFactory.createUsers({
                uuid: rows[0].uuid,
                name: rows[0].name,
                email: rows[0].email,
                role: rows[0].role,
                password: rows[0].password,
                picture: rows[0].picture,
                description: rows[0].description
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getUsers() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE  `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => UsersFactory.createUsers({
                uuid: row.uuid,
                name: row.name,
                description: row.description,
                email: row.email,
                role: row.role,
                password: row.password,
                picture: row.picture
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getUserByEmail(email: string) {
    try {
        if (email == null || email === undefined || (typeof email === 'string' && !email.trim())) {
            return null;
        }
        const [results] = await db.query(
            `
            SELECT *
            FROM ${TABLE_NAME} 
            WHERE email = ? AND deletedAt IS NULL
            `,
            [email]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return UsersFactory.createUsers({
                uuid: rows[0].uuid,
                name: rows[0].name,
                email: rows[0].email,
                role: rows[0].role,
                password: rows[0].password,
                picture: rows[0].picture,
                description: rows[0].description
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}