import { Request, Response } from "express";
import { getCupon, getCupons } from "../db/cuponsMysql";
import CuponsFactory from "../cuponsFactory";

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
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const cupons = await getCupons(fair);
        if (cupons && cupons.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: cupons.map(cupon => {
                    return CuponsFactory.cuponsToJson(cupon);
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
            data: null
        });
    }
}