import { Request, Response } from "express";
import { getStore, getStores } from "../db/storesMysql";
import StoresFactory from "../storesFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const getStoreController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const fair = getFairUuid(req.user?.fair);
        if (!fair) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const store = await getStore(uuid, fair);
        if (store) {
            res.json({
                message: "",
                status: 200,
                data: StoresFactory.storesToJson(store)
            });
        } else {
            res.json({ message: "", status: 200, data: null });
        }
    } catch (err: any) {
        res.json({ message: err.message, status: 400, data: null });
    }
};

export const getStoresController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        const stores = fair ? await getStores(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: stores && stores.length > 0 ? stores.map(store => StoresFactory.storesToJson(store)) : []
        });
    } catch (err: any) {
        res.json({ message: err.message, status: 400, data: null });
    }
};