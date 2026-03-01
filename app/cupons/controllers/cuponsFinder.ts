import { Request, Response } from "express";
import { getCupon, getCupons } from "../db/cuponsMysql";
import CuponsFactory from "../cuponsFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const getCuponByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const cupon = await getCupon(uuid);
        if (cupon) {
            res.json({
                message: "",
                status: 200,
                data: CuponsFactory.cuponsToJson(cupon)
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

export const getCuponsController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        const cupons = fair ? await getCupons(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: cupons && cupons.length > 0 ? cupons.map(cupon => CuponsFactory.cuponsToJson(cupon)) : []
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}