import { Request, Response } from "express";
import { getSponsor, getSponsors } from "../db/sponsorsMysql";
import SponsorsFactory from "../sponsorsFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const getSponsorsByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const sponsors = await getSponsor(uuid);
        if (sponsors) {
            res.json({
                message: "",
                status: 200,
                data: SponsorsFactory.sponsorsToJson(sponsors)
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
            data: null
        });
    }
}

export const getSponsorsController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        const sponsors = fair ? await getSponsors(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: sponsors && sponsors.length > 0 ? sponsors.map(sponsor => SponsorsFactory.sponsorsToJson(sponsor)) : []
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}