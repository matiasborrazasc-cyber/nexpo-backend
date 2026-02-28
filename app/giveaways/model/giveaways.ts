class Giveaways {

    uuid: string;
    date: string;
    hour: string;
    name: string;
    fair: string;
    picture: string;
    description: string;

    constructor(
        uuid: string,
        date: string,
        hour: string,
        name: string,
        fair: string,
        picture: string,
        description: string
    ) {
        this.uuid = uuid;
        this.date = date;
        this.hour = hour;
        this.name = name;
        this.fair = fair;
        this.picture = picture;
        this.description = description;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getPicture(): string {
        return this.picture;
    }

    public getDescription(): string {
        return this.description;
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

    public getFair(): string {
        return this.fair;
    }
}

export default Giveaways;