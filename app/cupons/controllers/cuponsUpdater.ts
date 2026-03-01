import { Request, Response } from "express";
import { update } from "../db/cuponsMysql";
import CuponsFactory from "../cuponsFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const uuid = req.params.uuid;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const cupons = CuponsFactory.createCupons({
            uuid,
            description: data.description ?? '',
            title: data.title ?? '',
            picture: data.picture ?? '',
            fair
        });
        const result = await update(cupons);
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