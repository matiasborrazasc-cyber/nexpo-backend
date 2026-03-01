import { Request, Response } from "express";
import { update } from "../db/speakersMysql";
import SpeakersFactory from "../speakersFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "", status: 200, data: null });
            return;
        }
        const speakers = SpeakersFactory.createSpeaker({ ...data, uuid, fair });
        const result = await update(speakers);
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