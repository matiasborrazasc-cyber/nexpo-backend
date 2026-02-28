import { Request, Response } from "express";
import InfluencerFactory from "../influencerFactory";
import { createInfluencer } from "../db/influencerMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair;
        if (!fair) {
            res.json({
                message: "Fair no encontrado",
                status: 400,
                data: null
            });
            return;
        }
        const influencer = InfluencerFactory.createInfluencerFromData({...data, fair: fair.uuid});
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