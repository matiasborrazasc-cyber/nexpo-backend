import { Request, Response } from 'express';
import { getDashboardStats, getUpcomingEvents } from '../db/dashboardMysql';
import { getFairUuid } from '../../utils/fairUtils';

const emptyStats = {
    totalStands: 0,
    totalClients: 0,
    totalEvents: 0,
    totalSpeakers: 0,
    totalArticles: 0,
    totalGiveaways: 0,
    upcomingEvents: [],
};

export const getStatsController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid((req as any).user?.fair);
        if (!fair) {
            res.json({ message: '', status: 200, data: emptyStats });
            return;
        }
        const stats = await getDashboardStats(fair);
        const upcomingEvents = await getUpcomingEvents(fair);
        res.json({
            message: '',
            status: 200,
            data: { ...stats, upcomingEvents },
        });
    } catch (err: any) {
        res.json({
            message: err?.message || 'Error al cargar estadísticas',
            status: 400,
            data: null,
        });
    }
};
