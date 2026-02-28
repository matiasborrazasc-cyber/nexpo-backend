import { RowDataPacket } from 'mysql2';
import db from '../../../config/connection';

/** Cuenta registros por fair en una tabla. */
async function countByFair(table: string, fairColumn: string, fair: string): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT COUNT(*) as total FROM \`${table}\` WHERE \`${fairColumn}\` = ? AND \`deletedAt\` IS NULL`,
        [fair]
    );
    return rows[0]?.total ?? 0;
}

/** Cuenta users_fair por fair. */
async function countUsersFair(fair: string): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT COUNT(*) as total FROM `users_fair` WHERE `fair` = ? AND `deletedAt` IS NULL',
        [fair]
    );
    return rows[0]?.total ?? 0;
}

export async function getDashboardStats(fair: string) {
    const [totalStands, totalClients, totalEvents, totalSpeakers, totalArticles, totalGiveaways] = await Promise.all([
        countByFair('stores', 'fair', fair),
        countUsersFair(fair),
        countByFair('event_calendar', 'fair', fair),
        countByFair('speakers', 'fair', fair),
        countByFair('articles', 'fair', fair),
        countByFair('giveaways', 'fair', fair),
    ]);

    return {
        totalStands,
        totalClients,
        totalEvents,
        totalSpeakers,
        totalArticles,
        totalGiveaways,
    };
}

/** Próximos eventos (fecha >= hoy, ordenados por fecha, límite 7). */
export async function getUpcomingEvents(fair: string) {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT uuid, name, date, hour, place FROM event_calendar 
         WHERE fair = ? AND deletedAt IS NULL AND date >= CURDATE() 
         ORDER BY date ASC, hour ASC LIMIT 7`,
        [fair]
    );
    return rows.map((r: any) => ({
        uuid: r.uuid,
        name: r.name,
        date: r.date,
        hour: r.hour,
        place: r.place,
    }));
}
