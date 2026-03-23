import { Request, Response } from "express";
import { getAdmin, getAdminByEmail, getAdminByUuid } from "../db/adminMysql";
import AdminFactory from "../adminFactory";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_super_secreta';


export const getAdminByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const admin = await getAdminByUuid(uuid);
        if (admin) {
            res.json({
                message: "",
                status: 200,
                data: AdminFactory.adminToJson(admin)
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

export const getAdminsControllers = async (req: Request, res: Response) => {
    try {
        const admins = await getAdmin();
        if (admins && admins.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: admins.map(admin => {
                    return AdminFactory.adminToJson(admin);
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

        if (!email || typeof email !== 'string' || !email.trim()) {
            res.json({
                message: "Email o contraseña inválida",
                status: 401,
                data: null
            });
            return;
        }

        const admin = await getAdminByEmail(email.trim());

        if (!admin) {
            res.json({
                message: "Email o contraseña inválida",
                status: 401,
                data: null
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            res.json({
                message: "Email o contraseña inválida",
                status: 401,
                data: null
            });
            return;
        }

        const payload = {
            name: admin.name,
            uuid: admin.uuid,
            role: admin.role,
            fair: admin.fair,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: "",
            status: 200,
            data: {
                token: token,
                user: AdminFactory.adminToJson(admin)
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
