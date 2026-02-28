import { Request, Response } from "express";
import { update, getMatchUsersByUuid } from "../db/matchUsersMysql";
import MatchUsersFactory from "../matchUsersFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const myUuid = (req as any).user?.uuid;
        const { status } = req.body || {};
        if (!myUuid || !uuid || !status) {
            res.json({ message: "Faltan uuid o status", status: 400, data: null });
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
        const isSender = match.getUserSend() === myUuid;
        if (!isReceiver && !isSender) {
            res.json({ message: "No puedes modificar esta solicitud", status: 403, data: null });
            return;
        }
        const matchUser = MatchUsersFactory.createMatchUsers({
            uuid: match.getUuid(),
            userSend: match.getUserSend(),
            userReceive: match.getUserReceive(),
            fair: match.getFair(),
            status
        });
        await update(matchUser);
        res.json({ message: "", status: 200, data: null });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}