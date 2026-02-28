import { Request, Response } from "express";
import SponsorsFactory from "../sponsorsFactory";
import { createSponsors } from "../db/sponsorsMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const sponsors = SponsorsFactory.createSponsorsFromData({
            name: data.name ?? '',
            description: data.description ?? '',
            image: data.image ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            fair
        });
        const result = await createSponsors(sponsors);
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