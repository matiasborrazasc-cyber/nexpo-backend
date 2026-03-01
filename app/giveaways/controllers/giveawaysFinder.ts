import { Request, Response } from "express";
import { getGiveaways, getGiveawaysByUuid } from "../db/giveawaysMysql";
import GiveawaysFactory from "../giveawaysFactory";

export const getGiveawaysByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const giveaways = await getGiveawaysByUuid(uuid);
        if (giveaways) {
            res.json({
                message: "",
                status: 200,
                data: GiveawaysFactory.giveawaysToJson(giveaways)
            })
        } else {
            res.json({
                message: "",
                status: 200,
                data: null
            });
        }
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}

/** Extrae el UUID de fair de forma segura (string o {uuid, name}) */
function getFairUuid(fair: any): string | null {
    if (fair == null || fair === undefined) return null;
    if (typeof fair === 'string' && fair.trim()) return fair.trim();
    if (typeof fair === 'object' && fair.uuid && typeof fair.uuid === 'string') return fair.uuid.trim();
    return null;
}

export const getGiveawaysController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const giveaways = await getGiveaways(fair);
        if (giveaways && giveaways.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: giveaways.map(g => GiveawaysFactory.giveawaysToJson(g))
            });
        } else {
            res.json({
                message: "",
                status: 200,
                data: []
            });
        }
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}