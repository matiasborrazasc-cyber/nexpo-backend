import { Request, Response } from "express";
import CommentsEventCalendarFactory from "../commentsEventCalendarFactory";
import { createCommentsEventCalendar } from "../db/commentsEventCalendarMysql";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const commentsEventCalendar = CommentsEventCalendarFactory.createCommentsEventCalendarFromData(data);
        const result = await createCommentsEventCalendar(commentsEventCalendar);
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