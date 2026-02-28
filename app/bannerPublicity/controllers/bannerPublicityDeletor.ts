import { Request, Response } from "express";
import { deleteBannerPublicity as deleteBannerPublicityDb } from "../db/bannerPublicityMysql";

export const deleteBannerPublicity = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        await deleteBannerPublicityDb(uuid);
        res.json({
            message: "",
            status: 200,
            data: null
        });
    } catch (err: any) {
        res.status(400).json({
            message: err?.message || "Error al eliminar",
            status: 400,
            data: null
        });
    }
};