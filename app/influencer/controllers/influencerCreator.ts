import { Request, Response } from "express";
import InfluencerFactory from "../influencerFactory";
import { createInfluencer } from "../db/influencerMysql";
import { getFairUuid } from "../../utils/fairUtils";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fairUuid = getFairUuid(req.user?.fair);
        if (!fairUuid) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const influencer = InfluencerFactory.createInfluencerFromData({...data, fair: fairUuid});
        const result = await createInfluencer(influencer);
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