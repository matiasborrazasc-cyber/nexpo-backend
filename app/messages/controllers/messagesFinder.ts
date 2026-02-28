import { Request, Response } from "express";
import { getMessages, getMessagesByUuid, getMessagesBetween, getConversationsWithLastMessage } from "../db/messagesMysql";
import MessagesFactory from "../messagesFactory";

export const getMessagesController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const message = await getMessagesByUuid(uuid);
        if (message) {
            res.json({
                message: "",
                status: 200,
                data: MessagesFactory.messagesToJson(message)
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

export const getMessageByUuidController = async (req: Request, res: Response) => {
    try {
        const messages = await getMessages();
        if (messages && messages.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: messages.map(message => {
                    return MessagesFactory.messagesToJson(message);
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

/** Lista de conversaciones (contacto + último mensaje) para la pestaña Conexiones. */
export const getConversationsController = async (req: Request, res: Response) => {
    try {
        const myUuid = (req as any).user?.uuid;
        if (!myUuid) {
            res.json({ message: "Usuario no identificado", status: 400, data: null });
            return;
        }
        const list = await getConversationsWithLastMessage(myUuid);
        res.json({
            message: "",
            status: 200,
            data: list
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al listar conversaciones",
            status: 400,
            data: null
        });
    }
}

/** Mensajes del chat con un contacto. */
export const getChatWithContactController = async (req: Request, res: Response) => {
    try {
        const myUuid = (req as any).user?.uuid;
        const contactUuid = req.params.contactUuid;
        if (!myUuid || !contactUuid) {
            res.json({ message: "Faltan parámetros", status: 400, data: null });
            return;
        }
        const messages = await getMessagesBetween(myUuid, contactUuid);
        res.json({
            message: "",
            status: 200,
            data: messages.map(m => MessagesFactory.messagesToJson(m))
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al cargar mensajes",
            status: 400,
            data: null
        });
    }
}