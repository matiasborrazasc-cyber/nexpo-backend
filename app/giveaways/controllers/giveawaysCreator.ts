import { Request, Response } from "express";
import GiveawaysFactory from "../giveawaysFactory";
import { createGiveaways } from "../db/giveawaysMysql";
import { toMySQLDate } from "../../utils/dateFormat";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const giveaways = GiveawaysFactory.giveawaysFromData({
            date: toMySQLDate(data.date ?? ''),
            hour: data.hour ?? '',
            name: data.name ?? '',
            picture: data.picture ?? '',
            description: data.description ?? '',
            fair
        });
        const result = await createGiveaways(giveaways);
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