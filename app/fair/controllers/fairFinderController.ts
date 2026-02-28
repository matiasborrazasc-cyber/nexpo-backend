import { Request, Response } from "express";
import { getFair, getFairByUuid } from "../db/fairMysql";
import FairFactory from "../fairFactory";

export const getFairByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const fair = await getFairByUuid(uuid);
        if (fair) {
            res.json({
                message: "",
                status: 200,
                data: FairFactory.fairToJson(fair)
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

export const getFairsController = async (req: Request, res: Response) => {
    try {
        const fairs = await getFair();
        if (fairs && fairs.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: fairs.map(fair => {
                    return FairFactory.fairToJson(fair);
                })
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