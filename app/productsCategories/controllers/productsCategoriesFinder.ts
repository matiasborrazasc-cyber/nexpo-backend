import { Request, Response } from "express";
import { getProductCategoriesByUuid, getProductCategories, getProductCategoriesByStore } from "../db/productsCategoriesMysql";
import ProductsCategoriesFactory from "../productsCategoriesFactory";

export const getProductCategoriesByUuidController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const product = await getProductCategoriesByUuid(uuid);
        if (product) {
            res.json({
                message: "",
                status: 200,
                data: ProductsCategoriesFactory.productCategoriesToJson(product)
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

export const getProductCategoriesController = async (req: Request, res: Response) => {
    try {
        const productCategory = await getProductCategories();
        if (productCategory && productCategory.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: productCategory.map(product => {
                    return ProductsCategoriesFactory.productCategoriesToJson(product);
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

export const getProductCategoriesByStoreController = async (req: Request, res: Response) => {
    try {
        const storeUuid = req.params.store;
        const categories = await getProductCategoriesByStore(storeUuid);
        res.json({
            message: "",
            status: 200,
            data: categories.map(c => ProductsCategoriesFactory.productCategoriesToJson(c))
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
};