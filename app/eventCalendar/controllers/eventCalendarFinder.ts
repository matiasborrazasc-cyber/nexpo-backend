import { Request, Response } from "express";
import { getEventCalendar, getEventCalendars } from "../db/eventCalendarMysql";
import EventCalendarFactory from "../eventCalendarFactory";
import { getFairUuid } from "../../utils/fairUtils";

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
        const fair = getFairUuid(req.user?.fair);
        const eventCalendar = fair ? await getEventCalendars(fair) : [];
        res.json({
            message: "",
            status: 200,
            data: eventCalendar && eventCalendar.length > 0 ? eventCalendar.map(ev => EventCalendarFactory.eventCalendarToJson(ev)) : []
        });
    } catch (err: any) {
        res.json({
            message: err.message,
            status: 400,
            data: null
        });
    }
}