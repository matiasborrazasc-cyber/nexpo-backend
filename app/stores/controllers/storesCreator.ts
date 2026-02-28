import { Request, Response } from "express";
import StoresFactory from "../storesFactory";
import { createStores } from "../db/storesMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair;
        if (!fair) {
            res.json({
                message: "Fair no encontrado",
                status: 400,
                data: null
            });
            return;
        }
        const fairUuid = fair?.uuid ?? fair;
        const stores = StoresFactory.createStoresFromData({
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
            fair: fairUuid
        });
        const result = await createStores(stores);
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