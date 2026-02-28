import { Request, Response } from "express";
import { createProducts } from "../db/productsMysql";
import ProductsFactory from "../productsFactory";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const product = ProductsFactory.createProductsFromData(data);
        const result = await createProducts(product);
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