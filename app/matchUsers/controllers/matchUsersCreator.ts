import { Request, Response } from "express";
import MatchUsersFactory from "../matchUsersFactory";
import { createMatchUsers } from "../db/matchUsersMysql";
import { getUsersFairByUserAndFair } from "../../usersFair/db/usersFairMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const userSend = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        const { userReceive, status } = req.body || {};
        if (!userSend || !fair || !userReceive) {
            res.json({
                message: "Faltan userReceive o no hay usuario/fair en el token",
                status: 400,
                data: null
            });
            return;
        }
        const senderRow = await getUsersFairByUserAndFair(userSend, fair);
        if (senderRow && (senderRow.match_visible === 0 || senderRow.match_visible === false)) {
            res.json({
                message: "Tenés desactivado 'Aparecer en match'. Activálo para enviar solicitudes.",
                status: 400,
                data: null
            });
            return;
        }
        const receiverRow = await getUsersFairByUserAndFair(userReceive, fair);
        if (receiverRow && (receiverRow.match_visible === 0 || receiverRow.match_visible === false)) {
            res.json({
                message: "Este usuario no acepta solicitudes de match",
                status: 400,
                data: null
            });
            return;
        }
        const matchUser = MatchUsersFactory.createMatchUsersFromData({
            uuid: "",
            userSend,
            userReceive,
            fair,
            status: status || "pending"
        });
        const result = await createMatchUsers(matchUser);
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