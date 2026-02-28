import { Request, Response } from "express";
import ProductsCategoriesFactory from "../productsCategoriesFactory";
import { createProductsCategories } from "../db/productsCategoriesMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = data.fair || (req as any).user?.fair?.uuid || '';
        const productCategories = ProductsCategoriesFactory.createProductsCategoriesFromData({ ...data, fair });
        await createProductsCategories(productCategories);
        res.json({
            message: "",
            status: 200,
            data: ProductsCategoriesFactory.productCategoriesToJson(productCategories)
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}