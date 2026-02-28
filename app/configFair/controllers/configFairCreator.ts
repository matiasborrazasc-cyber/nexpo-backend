import { Request, Response } from "express";
import ConfigFairFactory from "../configFairFactory";
import { createConfigFair } from "../db/configFairMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const configFair = ConfigFairFactory.createConfigFairFromData(data);
        const result = await createConfigFair(configFair);
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