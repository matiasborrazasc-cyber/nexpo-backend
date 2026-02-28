import { Request, Response } from "express";
import { getMatchUsers, getMatchUsersByUuid, getMatchUsersByUserSend, getReceivedWithSenderInfo, getSentWithReceiverInfo, getAcceptedConnections } from "../db/matchUsersMysql";
import MatchUsersFactory from "../matchUsersFactory";

export const getMatchUsersController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const matchUsers = await getMatchUsersByUuid(uuid);
        if (matchUsers) {
            res.json({
                message: "",
                status: 200,
                data: MatchUsersFactory.matchUsersToJson(matchUsers)
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

export const getMatchUserByUuidController = async (req: Request, res: Response) => {
    try {
        const matchUser = await getMatchUsers();
        if (matchUser && matchUser.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: matchUser.map(matchUserAux => {
                    return MatchUsersFactory.matchUsersToJson(matchUserAux);
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

/** Invitaciones enviadas por el usuario (con nombre del receptor, para Explorar y Solicitudes > Enviadas). Filtrado por feria. */
export const getInvitationsSentController = async (req: Request, res: Response) => {
    try {
        const myUuid = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!myUuid || !fair) {
            res.json({ message: "Usuario o feria no identificado", status: 400, data: null });
            return;
        }
        const list = await getSentWithReceiverInfo(myUuid, fair);
        res.json({
            message: "",
            status: 200,
            data: list
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al listar invitaciones",
            status: 400,
            data: null
        });
    }
}

/** Invitaciones recibidas (pendientes), con nombre del que envía. Filtrado por feria. */
export const getReceivedController = async (req: Request, res: Response) => {
    try {
        const myUuid = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!myUuid || !fair) {
            res.json({ message: "Usuario o feria no identificado", status: 400, data: null });
            return;
        }
        const list = await getReceivedWithSenderInfo(myUuid, fair);
        res.json({
            message: "",
            status: 200,
            data: list
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al listar solicitudes recibidas",
            status: 400,
            data: null
        });
    }
}

/** Conexiones aceptadas (para pestaña Chats: quien aceptaste o te aceptó). Filtrado por feria. */
export const getConnectionsController = async (req: Request, res: Response) => {
    try {
        const myUuid = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!myUuid || !fair) {
            res.json({ message: "Usuario o feria no identificado", status: 400, data: null });
            return;
        }
        const list = await getAcceptedConnections(myUuid, fair);
        res.json({
            message: "",
            status: 200,
            data: list
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al listar conexiones",
            status: 400,
            data: null
        });
    }
}