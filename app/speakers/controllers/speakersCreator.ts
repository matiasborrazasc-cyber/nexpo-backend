import { Request, Response } from "express";
import SpeakersFactory from "../speakersFactory";
import { createSpeakers } from "../db/speakersMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair.uuid;
        const speakers = SpeakersFactory.createSpeakersFromData({ ...data, fair });
        const result = await createSpeakers(speakers);
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