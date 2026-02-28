import { Request, Response } from "express";
import { getEventCalendar, getEventCalendars } from "../db/eventCalendarMysql";
import EventCalendarFactory from "../eventCalendarFactory";

export const getEventCalendarController = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        const eventCalendar = await getEventCalendar(uuid);
        if (eventCalendar) {
            res.json({
                message: "",
                status: 200,
                data: EventCalendarFactory.eventCalendarToJson(eventCalendar)
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

export const getEventCalendarsController = async (req: Request, res: Response) => {
    try {
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const eventCalendar = await getEventCalendars(fair);
        if (eventCalendar && eventCalendar.length > 0) {
            res.json({
                message: "",
                status: 200,
                data: eventCalendar.map(ev => EventCalendarFactory.eventCalendarToJson(ev))
            });
        } else {
            res.json({
                message: "",
                status: 200,
                data: []
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