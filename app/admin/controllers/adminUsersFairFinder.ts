import { Request, Response } from "express";
import { getUsersFairWithUserInfoAll } from "../../usersFair/db/usersFairMysql";
import { getFairUuid } from "../../utils/fairUtils";

/** GET /api/admin/users-fair - Lista TODOS los clientes de la feria (sin filtrar por match_visible). Para el dashboard admin. */
export const getAdminUsersFairController = async (req: Request, res: Response) => {
    try {
        console.log(req.user);
        const fair = getFairUuid((req as any).user?.fair);
        if (!fair) {
            res.json({ message: "", status: 200, data: [] });
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
