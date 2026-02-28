import { Request, Response } from "express";
import { update } from "../db/giveawaysWinnersMysql";
import GiveawaysWinnersFactory from "../giveawaysWinnersFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const giveawaysWinners = GiveawaysWinnersFactory.createGiveawaysWinners(data);
        const result = await update(giveawaysWinners);
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