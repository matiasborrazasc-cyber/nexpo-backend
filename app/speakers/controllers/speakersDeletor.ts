import { Request, Response } from "express";
import { deleteSpeaker } from "../db/speakersMysql";

export const speakerDeletor = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        await deleteSpeaker(uuid);
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