import { Request, Response } from "express";
import ArticlesFactory from "../articlesFactory";
import { createArticles } from "../db/articlesMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const articles = ArticlesFactory.createArticlesFromData({...data, fair: req.user?.fair.uuid});
        const result = await createArticles(articles);
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