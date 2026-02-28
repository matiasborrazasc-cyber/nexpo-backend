import { Request, Response } from "express";
import { getInfluencerViews } from "../db/influencerMysql";

export const getInfluencerViewsController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        if (!uuid) {
            res.status(400).json({ message: "UUID requerido", status: 400, data: null });
            return;
        }
        const views = await getInfluencerViews(uuid);
        if (!views) {
            res.status(404).json({ message: "Influencer no encontrado", status: 404, data: null });
            return;
        }
        res.json({ message: "OK", status: 200, data: views });
    } catch (err: any) {
        res.status(500).json({ message: err.message, status: 500, data: null });
    }
};
