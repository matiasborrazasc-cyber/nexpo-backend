import { Request, Response } from "express";
import UsersFairFactory from "../usersFairFactory";
import { createUsersFair } from "../db/usersFairMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const usersFair = UsersFairFactory.createUsersFairFromData(data);
        const result = await createUsersFair(usersFair);
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