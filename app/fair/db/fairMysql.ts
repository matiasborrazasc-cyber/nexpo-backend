import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';
import Fair from '../model/fair';
import FairFactory from '../fairFactory';

const TABLE_NAME = 'fair';

export async function createFair(fair: Fair) {
    try {
        const [results] = await db.query(
            'INSERT INTO `' + TABLE_NAME + '` (`uuid`, `name`, `logo`, `finishDate`, `startDate`,  `description`, `country`, `city`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL)',
            [
                fair.getUuid(),
                fair.getName(),
                fair.getLogo(),
                fair.getFinishDate(),
                fair.getStartDate(),
                fair.getDescription(),
                fair.getCountry(),
                fair.getCity()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function update(fair: Fair) {
    try {
        const [results] = await db.query(
            'UPDATE `' + TABLE_NAME + '` SET `name` = ?, `logo` = ?, `finishDate` = ?, `startDate` = ?, `description` = ?, `country` = ?, `city` = ?, `updatedAt` = NOW() WHERE `uuid` = ?',
            [
                fair.getName(),
                fair.getLogo(),
                fair.getFinishDate(),
                fair.getStartDate(),
                fair.getDescription(),
                fair.getCountry(),
                fair.getCity(),
                fair.getUuid()
            ]
        );
        return results;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}

export async function deleteFair(uuid: string) {
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

export async function getFairByUuid(uuid: string) {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `uuid` = ? AND `deletedAt` IS NULL',
            [uuid]
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return FairFactory.createFair({
                uuid: rows[0].uuid,
                name: rows[0].name,
                logo: rows[0].logo,
                finishDate: rows[0].finishDate,
                startDate: rows[0].startDate,
                description: rows[0].description,
                country: rows[0].country,
                city: rows[0].city
            });
        }
        return null;
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}


export async function getFair() {
    try {
        const [results] = await db.query(
            'SELECT * FROM `' + TABLE_NAME + '` WHERE `deletedAt` IS NULL'
        );

        const rows = results as RowDataPacket[];

        if (rows.length > 0) {
            return rows.map((row: any) => FairFactory.createFair({
                uuid: row.uuid,
                name: row.name,
                logo: row.logo,
                finishDate: row.finishDate,
                startDate: row.startDate,
                description: row.description,
                country: row.country,
                city: row.city
            }));
        }
        return [];
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err;
    }
}
