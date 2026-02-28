import { Request, Response } from "express";
import { getUsersFairByUserAndFair } from "../db/usersFairMysql";

/** GET /me - Devuelve match_visible del usuario actual para la feria del token. */
export const getMatchVisibleController = async (req: Request, res: Response) => {
    try {
        const userUuid = (req as any).user?.uuid;
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!userUuid || !fair) {
            res.status(400).json({ message: "Usuario o feria no encontrado", status: 400, data: null });
            return;
        }

        const row = await getUsersFairByUserAndFair(userUuid, fair);
        if (!row) {
            res.json({ message: "", status: 200, data: { matchVisible: true } });
            return;
        }

        const matchVisible = row.match_visible === 1 || row.match_visible === true;
        res.json({
            message: "",
            status: 200,
            data: { matchVisible }
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al obtener visibilidad",
            status: 400,
            data: null
        });
    }
};
