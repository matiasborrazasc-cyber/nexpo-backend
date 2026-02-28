import { Request, Response } from "express";
import EventCalendarFactory from "../eventCalendarFactory";
import { createEventCalendar } from "../db/eventCalendarMysql";
import { toMySQLDate } from "../../utils/dateFormat";

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const fair = req.user?.fair?.uuid ?? req.user?.fair;
        if (!fair) {
            res.json({ message: "Fair no encontrado", status: 400, data: null });
            return;
        }
        const eventCalendar = EventCalendarFactory.createEventCalendarFromData({
            date: toMySQLDate(data.date ?? ''),
            hour: data.hour ?? '',
            name: data.name ?? '',
            link: data.link ?? '',
            description: data.description ?? '',
            picture: data.picture ?? '',
            people: data.people ?? '',
            place: data.place ?? '',
            fair
        });
        const result = await createEventCalendar(eventCalendar);
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