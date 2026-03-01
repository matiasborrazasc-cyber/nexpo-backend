import { Request, Response } from "express";
import { getArticle, getArticles } from "../db/articlesMysql";
import ArticlesFactory from "../articlesFactory";
import { getFairUuid } from "../../utils/fairUtils";

export const getArticleController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const article = await getArticle(uuid);
        if (article) {
            res.json({
                message: "",
                status: 200,
                data: ArticlesFactory.articlesToJson(article)
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

export const getArticlesController = async (req: Request, res: Response) => {
    try {
        const fair = getFairUuid(req.user?.fair);
        const users = fair ? await getArticles(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: users && users.length > 0 ? users.map(user => ArticlesFactory.articlesToJson(user)) : []
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}