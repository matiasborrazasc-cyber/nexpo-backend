import { Request, Response } from "express";
import { getUsersFairWithUserInfoAll } from "../../usersFair/db/usersFairMysql";

/** GET /api/admin/users-fair - Lista TODOS los clientes de la feria (sin filtrar por match_visible). Para el dashboard admin. */
export const getAdminUsersFairController = async (req: Request, res: Response) => {
    try {
        const fair = (req as any).user?.fair?.uuid ?? (req as any).user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const list = await getUsersFairWithUserInfoAll(fair);
        res.json({
            message: "",
            status: 200,
            data: list
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al listar clientes",
            status: 400,
            data: null
        });
    }
};
