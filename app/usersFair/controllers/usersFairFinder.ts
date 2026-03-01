import { Request, Response } from "express";
import { getUserFair, getUsersFairWithUserInfo } from "../db/usersFairMysql";
import UsersFairFactory from "../usersFairFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const getUserFairController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const user = await getUserFair(uuid);
        if (user) {
            res.json({
                message: "",
                status: 200,
                data: UsersFairFactory.usersFairToJson(user)
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

export const getUsersFairController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        if (!fair) {
            res.json({ message: "", status: 200, data: [] });
            return;
        }
        const myUuid = (req as any).user?.uuid;
        const list = await getUsersFairWithUserInfo(fair);
        // Excluir al usuario actual: no puede invitarse a sí mismo.
        const filtered = myUuid
            ? list.filter((row: any) => row.user !== myUuid)
            : list;
        res.json({
            message: "",
            status: 200,
            data: filtered
        });
    } catch (err: any) {
        res.json({
            message: err?.message || "Error al listar clientes",
            status: 400,
            data: null
        });
    }
};



