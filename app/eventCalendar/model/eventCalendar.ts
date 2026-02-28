class EventCalendar {

    uuid: string;
    date: string;
    hour: string;
    name: string;
    link: string;
    description: string;
    picture: string;    
    people: string;
    fair: string;
    place: string;

    constructor(
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
    ) {
        this.uuid = uuid;
        this.date = date;
        this.hour = hour;
        this.name = name;
        this.link = link;
        this.description = description;
        this.picture = picture;
        this.people = people;
        this.fair = fair;
        this.place = place;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getDate(): string {
        return this.date;
    }

    public getHour(): string {
        return this.hour;
    }

    public getName(): string {
        return this.name;
    }

    public getLink(): string {
        return this.link;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPicture(): string {
        return this.picture;
    }

    public getPeople(): string {
        return this.people;
    }

    public getFair(): string {
        return this.fair;
    }

    public getPlace(): string {
        return this.place;
    }

}

export default EventCalendar;