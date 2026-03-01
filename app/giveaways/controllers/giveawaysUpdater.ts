import { Request, Response } from "express";
import { update } from "../db/giveawaysMysql";
import GiveawaysFactory from "../giveawaysFactory";
import { toMySQLDate } from "../../utils/dateFormat";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const uuid = req.params.uuid;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const giveaways = GiveawaysFactory.createGiveaways({
            uuid,
            date: toMySQLDate(data.date ?? ''),
            hour: data.hour ?? '',
            name: data.name ?? '',
            picture: data.picture ?? '',
            description: data.description ?? '',
            fair
        });
        const result = await update(giveaways);
        res.json({
            message: "",
            status: 200,
            data: null
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}