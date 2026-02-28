import { Request, Response } from "express";
import { getMatchUsersByUuid } from "../db/matchUsersMysql";
import { deleteMatchUsers as deleteMatchUsersDb } from "../db/matchUsersMysql";

export const deleteMatchUsers = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const myUuid = (req as any).user?.uuid;
        if (!myUuid || !uuid) {
            res.json({ message: "Faltan parámetros", status: 400, data: null });
            return;
        }
        const match = await getMatchUsersByUuid(uuid);
        if (!match) {
            res.json({ message: "Solicitud no encontrada", status: 404, data: null });
            return;
        }
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (fair && match.getFair() !== fair) {
            res.json({ message: "La solicitud no pertenece a tu feria", status: 403, data: null });
            return;
        }
        const isReceiver = match.getUserReceive() === myUuid;
        if (!isReceiver) {
            res.json({ message: "Solo quien recibe la solicitud puede rechazarla", status: 403, data: null });
            return;
        }
        await deleteMatchUsersDb(uuid);
        res.json({ message: "", status: 200, data: null });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}