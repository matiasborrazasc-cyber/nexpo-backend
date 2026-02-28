class Cupons {

    uuid: string;
    description: string;
    title: string;
    picture: string;
    fair: string;

    constructor(
        uuid: string,
        description: string,
        title: string,
        picture: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPicture(): string {
        return this.picture;
    }

    public getTitle(): string {
        return this.title;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default Cupons;