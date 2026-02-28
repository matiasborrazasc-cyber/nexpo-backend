import { Request, Response } from "express";
import BannerPublicityViewsFactory from "../bannerPublicityViewsFactory";
import { createBannerPublicityViews } from "../db/bannerPublicityViewsMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const bannerPublicity = BannerPublicityViewsFactory.createBannerPublicityViewsFromData(data);
        const result = await createBannerPublicityViews(bannerPublicity);
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