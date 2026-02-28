import { Request, Response } from "express";
import { update } from "../db/sponsorsMysql";
import SponsorsFactory from "../sponsorsFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const sponsor = SponsorsFactory.createSponsor({
            uuid: req.params.uuid,
            name: data.name ?? '',
            description: data.description ?? '',
            image: data.image ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            fair
        });
        const result = await update(sponsor);
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