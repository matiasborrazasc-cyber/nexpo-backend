import { Request, Response } from "express";
import InfluencerFactory from "../influencerFactory";
import { update } from "../db/influencerMysql";

export const updateController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const influencer = InfluencerFactory.createInfluencer({ ...data, uuid, fair });
        await update(influencer);
        res.json({
            message: "",
            status: 200,
            data: null
        });
    } catch (err: any) {
        res.status(400).json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}