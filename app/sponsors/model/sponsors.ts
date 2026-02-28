class Sponsors {

    uuid: string;
    name: string;
    description: string;
    image: string;
    email: string;
    phone: string;
    fair: string;

    constructor(
        uuid: string,
        name: string,
        description: string,
        image: string,
        email: string,
        phone: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.image = image;
        this.email = email;
        this.phone = phone;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getImage(): string {
        return this.image;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getFair(): string {
        return this.fair;
    }
}

export default Sponsors;
