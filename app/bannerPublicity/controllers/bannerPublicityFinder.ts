import { Request, Response } from "express";
import BannerPublicityFactory from "../bannerPublicityFactory";
import { getBannerPublicity, getBannersPublicity } from "../db/bannerPublicityMysql";

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
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const bannerPublicity = await getBannersPublicity(fair);
        if (bannerPublicity && bannerPublicity.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: bannerPublicity.map(banner => {
                    return BannerPublicityFactory.bannerPublicityToJson(banner);
                })
            })
        } else {
            res.json({
                message: "",
                status: 200,
                data: []
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