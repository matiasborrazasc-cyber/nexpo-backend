import { Request, Response } from "express";
import { updateMatchVisible, getUsersFairByUserAndFair } from "../db/usersFairMysql";

export const updateMatchVisibleController = async (req: Request, res: Response) => {
    try {
        const userUuid = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!userUuid || !fair) {
            res.status(400).json({ message: "Usuario o feria no encontrado", status: 400, data: null });
            return;
        }

        const matchVisible = req.body?.matchVisible;
        if (typeof matchVisible !== "boolean") {
            res.status(400).json({ message: "matchVisible debe ser true o false", status: 400, data: null });
            return;
        }

        const row = await getUsersFairByUserAndFair(userUuid, fair);
        if (!row) {
            res.status(404).json({ message: "No estás registrado en esta feria", status: 404, data: null });
            return;
        }

        await updateMatchVisible(userUuid, fair, matchVisible);
        res.json({
            message: "",
            status: 200,
            data: { matchVisible }
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al actualizar visibilidad",
            status: 400,
            data: null
        });
    }
};
