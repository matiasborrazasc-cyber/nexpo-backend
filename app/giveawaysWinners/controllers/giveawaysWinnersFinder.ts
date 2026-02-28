import { Request, Response } from "express";
import { getGiveawaysWinnersByUuid, getGiveawaysWinners } from "../db/giveawaysWinnersMysql";
import GiveawaysWinnersFactory from "../giveawaysWinnersFactory";

export const getGiveawaysWinnersByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const giveaways = await getGiveawaysWinnersByUuid(uuid);
        if (giveaways) {
            res.json({
                message: "",
                status: 200,
                data: GiveawaysWinnersFactory.giveawaysWinnersToJson(giveaways)
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
        const giveaways = await getGiveawaysWinners();
        if (giveaways && giveaways.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: giveaways.map(giveaway => {
                    return GiveawaysWinnersFactory.giveawaysWinnersToJson(giveaway);
                })
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