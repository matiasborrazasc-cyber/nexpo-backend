import { Request, Response } from "express";
import { update } from "../db/usersFairMysql";
import UsersFairFactory from "../usersFairFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const users = UsersFairFactory.createUsersFair(data);
        const result = await update(users);
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