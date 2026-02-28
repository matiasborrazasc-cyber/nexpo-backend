import { Request, Response } from "express";
import { getStore, getStores } from "../db/storesMysql";
import StoresFactory from "../storesFactory";

export const getStoreController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
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
        const store = await getStore(uuid, fairUuid);
        if (store) {
            res.json({
                message: "",
                status: 200,
                data: StoresFactory.storesToJson(store)
            })
        } else {
            res.json({
                message: "",
                status: 200,
                data: null
            });
        }
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}

export const getStoresController = async (req: Request, res: Response) => {
    try {
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
        const stores = await getStores(fairUuid);
        if (stores && stores.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: stores.map(store => StoresFactory.storesToJson(store))
            })
        } else {
            res.json({
                message: "",
                status: 200,
                data: null
            });
        }
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}