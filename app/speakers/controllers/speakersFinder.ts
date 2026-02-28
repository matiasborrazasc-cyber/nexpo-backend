import { Request, Response } from "express";
import { getSpeaker, getSpeakers } from "../db/speakersMysql";
import SpeakersFactory from "../speakersFactory";

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
        const fair = req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: [] });
            return;
        }
        const fairUuid = fair?.uuid ?? fair;
        const speakers = await getSpeakers(fairUuid);
        if (speakers && speakers.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: speakers.map(speaker => {
                    return SpeakersFactory.speakersToJson(speaker);
                })
            })
        } else {
            res.json({
                message: "",
                status: 200,
                data: []
            });
        }
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: []
        });
    }
}