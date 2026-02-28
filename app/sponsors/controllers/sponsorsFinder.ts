import { Request, Response } from "express";
import { getSponsor, getSponsors } from "../db/sponsorsMysql";
import SponsorsFactory from "../sponsorsFactory";

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
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        const sponsors = await getSponsors(fair);
        if (sponsors && sponsors.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: sponsors.map(sponsor => SponsorsFactory.sponsorsToJson(sponsor))
            });
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