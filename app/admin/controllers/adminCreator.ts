import { Request, Response } from "express";
import AdminFactory from "../adminFactory";
import { createAdmin } from "../db/adminMysql";
import bcrypt from 'bcrypt';


export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const admins = AdminFactory.createAdminFromData(data);
        const result = await createAdmin(admins);
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