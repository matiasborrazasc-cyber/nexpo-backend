import { Request, Response } from "express";
import ProductsFactory from "../productsFactory";
import { update } from "../db/productsMysql";

export const updateController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const data = req.body;
        const product = ProductsFactory.createProduct({ ...data, uuid });
        const result = await update(product);
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