import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import UsersFair from '../model/usersFair';
import UsersFairFactory from '../usersFairFactory';

const TABLE_NAME = 'users_fair';

export async function createUsersFair(usersFair: UsersFair) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `fair`, `user`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, NOW(), NOW(), NULL)',
            [
                usersFair.getUuid(),
                usersFair.getFair(),
                usersFair.getUser()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(usersFair: UsersFair) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET  `updatedAt` = NOW() WHERE `uuid` = ?',
            [usersFair.getUuid()]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function deleteUsersFair(uuid: string) {
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

export async function getUserFair(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return UsersFairFactory.createUsersFair({
                uuid: rows[0].uuid,
                fair: rows[0].fair,
                user: rows[0].user,
                name: rows[0].userName
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function getUsersFair(fair: string) {
    try {
        if (fair == null || fair === undefined || (typeof fair === 'string' && !fair.trim())) {
            return [];
        }
        const [results] = await db.query(
            `
  SELECT t.*, u.name as userName, u.email as userEmail
  FROM \`${TABLE_NAME}\` t
  JOIN users u ON u.uuid = t.user AND u.deletedAt IS NULL
  WHERE t.deletedAt IS NULL
    AND t.fair = ?
    `,
            [fair]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => UsersFairFactory.createUsersFair({
                uuid: row.uuid,
                fair: row.fair,
                user: row.user,
                name: row.userName
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

/** Lista users_fair con datos del user (name, email) para el fair dado. Solo incluye quienes tienen match_visible=1 (para Participantes/Explorar en la app). */
export async function getUsersFairWithUserInfo(fair: string): Promise<Array<{ uuid: string; fair: string; user: string; name: string; email: string }>> {
    try {
        if (fair == null || fair === undefined || (typeof fair === 'string' && !fair.trim())) {
            return [];
        }
        const [results] = await db.query(
            `
  SELECT t.uuid, t.fair, t.user, u.name as name, u.email as email
  FROM \`${TABLE_NAME}\` t
  JOIN users u ON u.uuid = t.user AND u.deletedAt IS NULL
  WHERE t.deletedAt IS NULL
    AND t.fair = ?
    AND (t.match_visible IS NULL OR t.match_visible = 1)
  ORDER BY u.name
    `,
            [fair]
        );

        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ({
            uuid: row.uuid,
            fair: row.fair,
            user: row.user,
            name: row.name ?? '',
            email: row.email ?? ''
        }));
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

/** Lista TODOS los users_fair con datos del user (para admin dashboard). No filtra por match_visible. */
export async function getUsersFairWithUserInfoAll(fair: string): Promise<Array<{ uuid: string; fair: string; user: string; name: string; email: string }>> {
    try {
        if (fair == null || fair === undefined || (typeof fair === 'string' && !fair.trim())) {
            return [];
        }
        const [results] = await db.query(
            `
  SELECT t.uuid, t.fair, t.user, u.name as name, u.email as email
  FROM \`${TABLE_NAME}\` t
  JOIN users u ON u.uuid = t.user AND u.deletedAt IS NULL
  WHERE t.deletedAt IS NULL
    AND t.fair = ?
  ORDER BY u.name
    `,
            [fair]
        );

        const rows = results as RowDataPacket[];
        return rows.map((row: any) => ({
            uuid: row.uuid,
            fair: row.fair,
            user: row.user,
            name: row.name ?? '',
            email: row.email ?? ''
        }));
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

/** Obtiene las ferias (uuid) en las que está el usuario. */
export async function getFairUuidsByUser(userUuid: string): Promise<string[]> {
    try {
        const [results] = await db.query(
            'SELECT fair FROM `' + TABLE_NAME + '` WHERE `user` = ? AND `deletedAt` IS NULL',
            [userUuid]
        );
        const rows = results as RowDataPacket[];
        return rows.map((r: any) => r.fair);
    } catch (err) {
        console.error("Error getFairUuidsByUser:", err);
        throw err;
    }
}

/** Obtiene users_fair por user y fair. */
export async function getUsersFairByUserAndFair(user: string, fair: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `user` = ? AND `fair` = ? AND `deletedAt` IS NULL',
            [user, fair]
        );
        const rows = results as RowDataPacket[];
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

/** Actualiza match_visible para un users_fair por user y fair. */
export async function updateMatchVisible(user: string, fair: string, matchVisible: boolean) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `match_visible` = ?, `updatedAt` = NOW() WHERE `user` = ? AND `fair` = ? AND `deletedAt` IS NULL',
            [matchVisible ? 1 : 0, user, fair]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

