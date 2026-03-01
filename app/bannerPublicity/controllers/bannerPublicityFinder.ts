import { Request, Response } from "express";
import BannerPublicityFactory from "../bannerPublicityFactory";
import { getBannerPublicity, getBannersPublicity } from "../db/bannerPublicityMysql";
import { getFairUuid } from "../../utils/fairUtils";

export const getBannerPublicityController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const bannerPublicity = await getBannerPublicity(uuid);
        if (bannerPublicity) {
            res.json({
                message: "",
                status: 200,
                data: BannerPublicityFactory.bannerPublicityToJson(bannerPublicity)
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

export const getBannersPublicityController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        const bannerPublicity = fair ? await getBannersPublicity(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: bannerPublicity && bannerPublicity.length > 0 ? bannerPublicity.map(banner => BannerPublicityFactory.bannerPublicityToJson(banner)) : []
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}