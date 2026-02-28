import { Request, Response } from "express";

export const productsCategoriesDeletor = async (req: Request, res: Response) => {
    try {
        const data = req.body;
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