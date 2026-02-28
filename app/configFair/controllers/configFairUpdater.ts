import { Request, Response } from "express";
import ConfigFairFactory from "../configFairFactory";
import { update } from "../db/configFairMysql";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const configFair = ConfigFairFactory.createConfigFair(data);
        const result = await update(configFair);
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