import { Request, Response } from "express";
import { getUser, getUserByEmail, getUsers } from "../db/usersMysql";
import UsersFactory from "../usersFactory";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'clave_super_secreta';



export const getUserController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const user = await getUser(uuid);
        if (user) {
            res.json({
                message: "",
                status: 200,
                data: UsersFactory.usersToJson(user)
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

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        if (users && users.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: users.map(user => {
                    return UsersFactory.usersToJson(user);
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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const admin = await getUserByEmail(email);

        if (!admin) {
            res.json({
                message: "Email o contraseña inválida",
                status: 200,
                data: null
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            res.json({
                message: "Email o contraseña inválida",
                status: 200,
                data: null
            });
            return;
        }

        const payload = {
            name: admin.name,
            uuid: admin.uuid,
            role: admin.role,
            fair: { uuid: '5755b802-f566-11ef-b15e-02d3accac345' }
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: "",
            status: 200,
            data: {
                token: token,
                user: UsersFactory.usersToJson(admin)
            }
        });

    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}
