import { Request, Response } from "express";
import GiveawaysWinnersFactory from "../giveawaysWinnersFactory";
import { createGiveawaysWinners } from "../db/giveawaysWinnersMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const eventCalendar = GiveawaysWinnersFactory.createGiveawaysWinnersFromData(data);
        const result = await createGiveawaysWinners(eventCalendar);
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