import { Request, Response } from "express";
import { getCommentEventCalendar, getCommentsEventCalendar } from "../db/commentsEventCalendarMysql";
import CommentsEventCalendarFactory from "../commentsEventCalendarFactory";

export const getCommentEventCalendarController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const commentsEventsCalendar = await getCommentEventCalendar(uuid);
        if (commentsEventsCalendar) {
            res.json({
                message: "",
                status: 200,
                data: CommentsEventCalendarFactory.commentsEventCalendarToJson(commentsEventsCalendar)
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

export const getCommentsEventCalendarController = async (req: Request, res: Response) => {
    try {
        const commentsEventsCalendar = await getCommentsEventCalendar();
        if (commentsEventsCalendar && commentsEventsCalendar.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: commentsEventsCalendar.map(commentsEvents => {
                    return CommentsEventCalendarFactory.commentsEventCalendarToJson(commentsEvents);
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