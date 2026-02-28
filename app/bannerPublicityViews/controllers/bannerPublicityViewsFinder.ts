import { Request, Response } from "express";
import { getBannerPublicityViews, getBannersPublicityViews } from "../db/bannerPublicityViewsMysql";
import BannerPublicityViewsFactory from "../bannerPublicityViewsFactory";

export const getBannerPublicityViewsController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const bannerPublicity = await getBannerPublicityViews(uuid);
        if (bannerPublicity) {
            res.json({
                message: "",
                status: 200,
                data: BannerPublicityViewsFactory.bannerPublicityViewsToJson(bannerPublicity)
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

export const getBannersPublicityViewsController = async (req: Request, res: Response) => {
    try {
        const bannerPublicity = await getBannersPublicityViews();
        if (bannerPublicity && bannerPublicity.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: bannerPublicity.map(banner => {
                    return BannerPublicityViewsFactory.bannerPublicityViewsToJson(banner);
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