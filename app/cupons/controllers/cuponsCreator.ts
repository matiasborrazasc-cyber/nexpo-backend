import { Request, Response } from "express";
import CuponsFactory from "../cuponsFactory";
import { createCupons } from "../db/cuponsMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const cupons = CuponsFactory.createCuponsFromData({
            description: data.description ?? '',
            title: data.title ?? '',
            picture: data.picture ?? '',
            fair
        });
        const result = await createCupons(cupons);
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