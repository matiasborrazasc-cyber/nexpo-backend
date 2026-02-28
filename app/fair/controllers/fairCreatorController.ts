import { Request, Response } from "express";
import { createFair } from "../db/fairMysql";
import FairFactory from "../fairFactory";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const giveaways = FairFactory.fairFromData(data);
        const result = await createFair(giveaways);
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