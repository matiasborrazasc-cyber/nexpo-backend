import { Request, Response } from "express";
import { getConfigFair } from "../db/configFairMysql";
import ConfigFairFactory from "../configFairFactory";

export const getConfigFairController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const configFair = await getConfigFair(uuid);
        if (configFair) {
            res.json({
                message: "",
                status: 200,
                data: ConfigFairFactory.configFairToJson(configFair)
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
