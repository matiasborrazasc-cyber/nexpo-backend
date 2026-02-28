import { Request, Response } from "express";
import { update } from "../db/productsCategoriesMysql";
import ProductsCategoriesFactory from "../productsCategoriesFactory";

export const updateController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productCategories = ProductsCategoriesFactory.createProductCategories(data);
        const result = await update(productCategories);
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