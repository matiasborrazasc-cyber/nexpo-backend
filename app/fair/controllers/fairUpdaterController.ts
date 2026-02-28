import { Request, Response } from "express";
import { update } from "../db/fairMysql";
import FairFactory from "../fairFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const uuid = req.params.uuid;
        const fairsUpdater = FairFactory.createFair({ ...data, uuid });
        const result = await update(fairsUpdater);
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