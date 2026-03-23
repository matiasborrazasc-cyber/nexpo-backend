import { Request, Response } from "express";
import UsersFactory from "../usersFactory";
import { createUsers } from "../db/usersMysql";
import { createUsersFair } from "../../usersFair/db/usersFairMysql";
import UsersFairFactory from "../../usersFair/usersFairFactory";
import bcrypt from 'bcrypt';

const DEFAULT_FAIR_UUID = '5755b802-f566-11ef-b15e-02d3accac345';

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fairUuid = data.fairUuid || DEFAULT_FAIR_UUID;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;


        const users = UsersFactory.createUsersFromData(data);
        const result = await createUsers(users);
        const userUuid = users.getUuid();
        try {
            const usersFair = UsersFairFactory.createUsersFairFromData({
                fair: fairUuid,
                user: userUuid
            });
            await createUsersFair(usersFair);
        } catch (_) {
            // Si ya existe users_fair o falla, no bloqueamos el registro
        }
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