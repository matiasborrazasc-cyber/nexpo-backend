import { Request, Response } from "express";
import BannerPublicityFactory from "../bannerPublicityFactory";
import { getBannersPublicityBySection } from "../db/bannerPublicityMysql";

/** GET /api/bannerPublicity/public - Banners por sección (público, sin auth) */
export const getBannersPublicController = async (req: Request, res: Response) => {
    try {
        const fair = req.query.fair as string;
        const section = req.query.section as string;
        if (!fair || !section) {
            res.json({ message: "fair y section requeridos", status: 400, data: [] });
            return;
        }
        const banners = await getBannersPublicityBySection(fair, section);
        res.json({
            message: "",
            status: 200,
            data: banners.map(b => BannerPublicityFactory.bannerPublicityToJson(b))
        });
    } catch (err: any) {
        res.json({ message: err.message, status: 400, data: [] });
    }
};
