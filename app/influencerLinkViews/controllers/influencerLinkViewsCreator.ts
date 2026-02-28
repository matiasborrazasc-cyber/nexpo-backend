import { Request, Response } from "express";
import InfluencerLinkViewsFactory from "../influencerLinkViewsFactory";
import { createInfluencerLinkViews } from "../db/influencerLinkViewsMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const influencerLinkViews = InfluencerLinkViewsFactory.createInfluencerLinkViews(data);
        const result = await createInfluencerLinkViews(influencerLinkViews);
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