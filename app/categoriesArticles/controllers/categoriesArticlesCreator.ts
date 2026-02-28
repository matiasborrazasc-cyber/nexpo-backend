import { Request, Response } from "express";
import CategoriesArticlesFactory from "../categoriesArticlesFactory";
import { createCategoriesArticles } from "../db/categoriesArticlesMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const categoriesArticles = CategoriesArticlesFactory.createCategoriesArticlesFromData(data);
        const result = await createCategoriesArticles(categoriesArticles);
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