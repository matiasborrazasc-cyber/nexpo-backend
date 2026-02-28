import { Request, Response } from "express";
import { deleteStores } from "../db/storesMysql";

export const storesDeletor = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        await deleteStores(uuid);
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