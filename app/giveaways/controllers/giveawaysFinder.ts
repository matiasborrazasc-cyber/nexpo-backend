import { Request, Response } from "express";
import { getGiveaways, getGiveawaysByUuid } from "../db/giveawaysMysql";
import GiveawaysFactory from "../giveawaysFactory";
import { getFairUuid } from "../../utils/fairUtils";

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

export const getGiveawaysController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        if (!fair) {
            res.json({ message: "", status: 200, data: [] });
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