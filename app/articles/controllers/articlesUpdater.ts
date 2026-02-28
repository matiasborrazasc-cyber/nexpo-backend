import { Request, Response } from "express";
import ArticlesFactory from "../articlesFactory";
import { update } from "../db/articlesMysql";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const uuid = req.params.uuid;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const articles = ArticlesFactory.createArticles({
            uuid,
            name: data.name ?? '',
            description: data.description ?? '',
            imagen: data.imagen ?? '',
            url: data.url ?? '',
            category: data.category ?? '',
            fair
        });
        await update(articles);
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