import { Request, Response } from "express";
import BannerPublicityFactory from "../bannerPublicityFactory";
import { createBannerPublicity } from "../db/bannerPublicityMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const bannerPublicity = BannerPublicityFactory.createBannerPublicityFromData({
            name: data.name ?? '',
            url: data.url ?? '',
            section: data.section ?? '',
            sponsor: data.sponsor ?? '',
            fair
        });
        const result = await createBannerPublicity(bannerPublicity);
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