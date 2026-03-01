import { Request, Response } from "express";
import { getSpeaker, getSpeakers } from "../db/speakersMysql";
import SpeakersFactory from "../speakersFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const getSpeakerByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const speaker = await getSpeaker(uuid);
        if (speaker) {
            res.json({
                message: "",
                status: 200,
                data: SpeakersFactory.speakersToJson(speaker)
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

export const getSpeakersController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        const speakers = fair ? await getSpeakers(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: speakers && speakers.length > 0 ? speakers.map(speaker => SpeakersFactory.speakersToJson(speaker)) : []
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: []
        });
    }
}