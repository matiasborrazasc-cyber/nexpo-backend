import { Request, Response } from "express";
import BannerPublicityViewsFactory from "../bannerPublicityViewsFactory";
import { update } from "../db/bannerPublicityViewsMysql";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const bannerPublicity = BannerPublicityViewsFactory.createBannerPublicityViews(data);
        const result = await update(bannerPublicity);
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