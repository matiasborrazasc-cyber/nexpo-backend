import { Request, Response } from "express";
import { deleteArticles } from "../db/articlesMysql";

export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        await deleteArticles(uuid);
        res.json({
            message: "",
            status: 200,
            data: null
        });
    } catch (err: any) {
        res.status(400).json({
            message: err?.message || "Error al eliminar",
            status: 400,
            data: null
        });
    }
};