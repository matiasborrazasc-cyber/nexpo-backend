import { Request, Response } from 'express';
import { getDashboardStats, getUpcomingEvents } from '../db/dashboardMysql';

export const getStatsController = async (req: Request, res: Response) => {
    try {
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!fair) {
            res.status(400).json({ message: 'Fair no encontrado', status: 400, data: null });
            return;
        }

        const stats = await getDashboardStats(fair);
        const upcomingEvents = await getUpcomingEvents(fair);

        res.json({
            message: '',
            status: 200,
            data: {
                ...stats,
                upcomingEvents,
            },
        });
    } catch (err: any) {
        res.json({
            message: err?.message || 'Error al cargar estadísticas',
            status: 400,
            data: null,
        });
    }
};
