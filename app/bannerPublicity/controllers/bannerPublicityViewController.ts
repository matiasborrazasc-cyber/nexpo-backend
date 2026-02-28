import { Request, Response } from "express";
import { incrementBannerViews } from "../db/bannerPublicityMysql";

/** POST /api/bannerPublicity/:uuid/view - Registrar visualización (público, sin auth) */
export const registerBannerViewController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        if (!uuid) {
            res.status(400).json({ message: "UUID requerido", status: 400, data: null });
            return;
        }
        await incrementBannerViews(uuid);
        res.json({ message: "OK", status: 200, data: { ok: true } });
    } catch (err: any) {
        res.status(500).json({ message: err.message, status: 500, data: null });
    }
};
