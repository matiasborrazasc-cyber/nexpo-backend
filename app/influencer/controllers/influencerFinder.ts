import { Request, Response } from "express";
import { getInfluencer, getInfluencers } from "../db/influencerMysql";
import InfluencerFactory from "../influencerFactory";

export const getInfluencerController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const influencer = await getInfluencer(uuid);
        if (influencer) {
            res.json({
                message: "",
                status: 200,
                data: InfluencerFactory.influencerToJson(influencer)
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

export const getInfluencersController = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const influencers = await getInfluencers(user?.fair?.uuid);
        if (influencers && influencers.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: influencers.map(influencer => InfluencerFactory.influencerToJson(influencer))
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