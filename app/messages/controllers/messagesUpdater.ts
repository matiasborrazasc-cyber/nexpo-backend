import { Request, Response } from "express";
import MessagesFactory from "../messagesFactory";
import { update } from "../db/messagesMysql";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const messages = MessagesFactory.createMessagesFromData(data);
        const result = await update(messages);
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