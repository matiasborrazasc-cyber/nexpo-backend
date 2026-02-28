import { Request, Response } from "express";
import { getProduct, getProductsByStore } from "../db/productsMysql";
import ProductsFactory from "../productsFactory";

export const getProductByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const product = await getProduct(uuid);
        if (product) {
            res.json({
                message: "",
                status: 200,
                data: ProductsFactory.productToJson(product)
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

export const getProductController = async (req: Request, res: Response) => {
    try {
        const store = req.params.store;
        const products = await getProductsByStore(store);
        if (products) {
            res.json({
                message: "",
                status: 200,
                data: products
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