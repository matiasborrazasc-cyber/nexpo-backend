import { Request, Response } from "express";
import { deleteInfluencer as deleteInfluencerDb } from "../db/influencerMysql";

export const deleteInfluencer = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        await deleteInfluencerDb(uuid);
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