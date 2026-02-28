import { v4 as uuidv4 } from 'uuid';
import EventCalendar from './model/eventCalendar';

class EventCalendarFactory {

    public static createEventCalendarFromData(data: {
        date: string,
        hour: string,
        name: string,
        link: string,
        description: string,
        place: string,
        picture: string,
        people: string,
        fair: string
    }): EventCalendar {
        return new EventCalendar(uuidv4(), data.date, data.hour, data.name, data.link, data.description, data.picture, data.people, data.fair, data.place);
    }

    public static createEventCalendar(data: {
        uuid: string,
        date: string,
        hour: string,
        name: string,
        link: string,
        description: string,
        picture: string,        
        people: string,
        fair: string,
        place: string
    }): EventCalendar {
        return new EventCalendar(data.uuid, data.date, data.hour, data.name, data.link, data.description, data.picture, data.people, data.fair, data.place);
    }

    public static eventCalendarToJson(eventCalendar: EventCalendar) {
        return {
            uuid: eventCalendar.getUuid(),
            date: eventCalendar.getDate(),
            hour: eventCalendar.getHour(),
            name: eventCalendar.getName(),
            link: eventCalendar.getLink(),
            description: eventCalendar.getDescription(),
            picture: eventCalendar.getPicture(),
            people: eventCalendar.getPeople(),
            fair: eventCalendar.getFair(),
            place: eventCalendar.getPlace()
        };
    }

}

export default EventCalendarFactory;