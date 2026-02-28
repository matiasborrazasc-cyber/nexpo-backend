import { Request, Response } from "express";
import { update } from "../db/bannerPublicityMysql";
import BannerPublicityFactory from "../bannerPublicityFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const uuid = req.params.uuid;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const bannerPublicity = BannerPublicityFactory.createBannerPublicity({
            uuid,
            name: data.name ?? '',
            url: data.url ?? '',
            section: data.section ?? '',
            sponsor: data.sponsor ?? '',
            fair
        });
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