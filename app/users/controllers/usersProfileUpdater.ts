import { Request, Response } from "express";
import { updateProfile } from "../db/usersMysql";
import { getUser } from "../db/usersMysql";
import UsersFactory from "../usersFactory";

export const updateMeController = async (req: Request, res: Response) => {
    try {
        const uuid = (req as any).user?.uuid;
        if (!uuid) {
            res.status(401).json({ message: "No autorizado", status: 401, data: null });
            return;
        }
        const { name, description, picture } = req.body || {};
        const data: { name?: string; description?: string | null; picture?: string | null } = {};
        if (typeof name === "string" && name.trim()) data.name = name.trim();
        if (description !== undefined) data.description = typeof description === "string" ? description : null;
        if (picture !== undefined) data.picture = typeof picture === "string" ? picture : null;

        if (Object.keys(data).length === 0) {
            res.json({ message: "Nada que actualizar", status: 200, data: null });
            return;
        }

        await updateProfile(uuid, data);
        const user = await getUser(uuid);
        res.json({
            message: "",
            status: 200,
            data: user ? UsersFactory.usersToJson(user) : null
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al actualizar perfil",
            status: 400,
            data: null
        });
    }
};
