import { Request, Response } from "express";
import { update } from "../db/influencerLinkViewsMysql";
import InfluencerLinkViewsFactory from "../influencerLinkViewsFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const influencerLinkViews = InfluencerLinkViewsFactory.createInfluencerLinkViews(data);
        const result = await update(influencerLinkViews);
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