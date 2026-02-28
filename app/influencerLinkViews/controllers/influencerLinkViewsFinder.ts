import { Request, Response } from "express";
import { getInfluencerLinkViews, getInfluencersLinksViews } from "../db/influencerLinkViewsMysql";
import InfluencerLinkViewsFactory from "../influencerLinkViewsFactory";


export const getInfluencerLinksViewController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const influencer = await getInfluencerLinkViews(uuid);
        if (influencer) {
            res.json({
                message: "",
                status: 200,
                data: InfluencerLinkViewsFactory.influencerLinkViewsToJson(influencer)
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

export const getInfluencerLinkViewByUuidController = async (req: Request, res: Response) => {
    try {
        const influencers = await getInfluencersLinksViews();
        if (influencers && influencers.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: influencers.map(influencer => {
                    return InfluencerLinkViewsFactory.influencerLinkViewsToJson(influencer);
                })
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