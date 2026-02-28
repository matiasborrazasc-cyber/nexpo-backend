import { Request, Response } from "express";
import { getCategoriesArticles, getCategoryArticles } from "../db/categoriesArticlesMysql";
import CategoriesArticlesFactory from "../categoriesArticlesFactory";


export const getCategoryArticlesController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const categoriesArticle = await getCategoryArticles(uuid);
        if (categoriesArticle) {
            res.json({
                message: "",
                status: 200,
                data: CategoriesArticlesFactory.categoriesArticlesToJson(categoriesArticle)
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

export const getCategoriesArticlesController = async (req: Request, res: Response) => {
    try {
        const categoriesArticle = await getCategoriesArticles();
        if (categoriesArticle && categoriesArticle.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: categoriesArticle.map(category => {
                    return CategoriesArticlesFactory.categoriesArticlesToJson(category);
                })
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