import { Request, Response } from "express";
import { update } from "../db/storesMysql";
import StoresFactory from "../storesFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const updateController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const data = req.body;
        const fair = getFairUuid(req.user?.fair);
        if (!fair) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const store = StoresFactory.createStores({
            uuid,
            name: data.name ?? '',
            description: data.description ?? '',
            portada: data.portada ?? '',
            image: data.image ?? '',
            email: data.email ?? '',
            whatsapp: data.whatsapp ?? '',
            instagram: data.instagram ?? '',
            facebook: data.facebook ?? '',
            user: data.user ?? '',
            category: data.category ?? '',
            typeOfStand: data.typeOfStand ?? '',
            fair
        });
        await update(store);
        res.json({
            message: "",
            status: 200,
            data: null
        });
    } catch (err: any) {
        res.status(400).json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}