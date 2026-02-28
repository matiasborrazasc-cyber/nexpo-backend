import { Request, Response } from "express";
import MessagesFactory from "../messagesFactory";
import { createMessages } from "../db/messagesMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const userSend = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair ?? '';
        const { userReceive, message } = req.body || {};
        if (!userSend || !userReceive || !message) {
            res.json({
                message: "Faltan userReceive o message",
                status: 400,
                data: null
            });
            return;
        }
        // Formato que acepta MySQL (DATETIME o VARCHAR): 'YYYY-MM-DD HH:mm:ss'
        const dateForDb = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const messages = MessagesFactory.createMessagesFromData({
            uuid: '',
            userSend,
            userReceive,
            message: String(message),
            date: dateForDb,
            status: 'sent',
            fair
        });
        await createMessages(messages);
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