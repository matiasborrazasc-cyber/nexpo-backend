import { Request, Response } from 'express';
import { getConfig, getFirstConfig, upsertConfig } from '../db/fairConfigMysql';

const DEFAULT_COLOR = '#6840FF';

/** GET /api/config/public - Config pública (sin auth) para login/pantalla inicial */
export const getPublicConfigController = async (_req: Request, res: Response) => {
    try {
        const config = await getFirstConfig();
        res.json({
            message: '',
            status: 200,
            data: config
                ? { primaryColor: config.primaryColor, fairUuid: config.fairUuid }
                : { primaryColor: DEFAULT_COLOR, fairUuid: null },
        });
    } catch (err: any) {
        res.json({
            message: err?.message || 'Error',
            status: 400,
            data: { primaryColor: DEFAULT_COLOR, fairUuid: null },
        });
    }
};

function getFairUuid(req: Request): string | null {
    const fair = req.user?.fair;
    if (!fair) return null;
    return typeof fair === 'object' && fair !== null && 'uuid' in fair
        ? (fair as { uuid: string }).uuid
        : String(fair);
}

/** GET /api/config - Obtiene config de la feria del usuario (requiere auth) */
export const getConfigController = async (req: Request, res: Response) => {
    try {
        const fairUuid = getFairUuid(req);
        if (!fairUuid) {
            res.json({
                message: '',
                status: 200,
                data: { primaryColor: DEFAULT_COLOR },
            });
            return;
        }
        const config = await getConfig(fairUuid);
        res.json({
            message: '',
            status: 200,
            data: config
                ? { primaryColor: config.primaryColor, fairUuid }
                : { primaryColor: DEFAULT_COLOR, fairUuid },
        });
    } catch (err: any) {
        res.json({
            message: err?.message || 'Error',
            status: 400,
            data: { primaryColor: DEFAULT_COLOR },
        });
    }
};

/** PUT /api/config - Actualiza config (admin, requiere auth) */
export const updateConfigController = async (req: Request, res: Response) => {
    try {
        const fairUuid = getFairUuid(req);
        if (!fairUuid) {
            res.json({
                message: 'Fair no encontrado',
                status: 400,
                data: null,
            });
            return;
        }
        const { primaryColor } = req.body;
        const color = typeof primaryColor === 'string' && /^#[0-9A-Fa-f]{6}$/.test(primaryColor)
            ? primaryColor
            : DEFAULT_COLOR;
        await upsertConfig(fairUuid, color);
        res.json({
            message: '',
            status: 200,
            data: { primaryColor: color },
        });
    } catch (err: any) {
        res.json({
            message: err?.message || 'Error',
            status: 400,
            data: null,
        });
    }
};
