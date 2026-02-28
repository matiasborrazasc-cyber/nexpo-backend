class Speakers {

    uuid: string;
    name: string;
    picture: string;
    description: string;
    email: string;
    whatsapp: string;
    instagram: string;
    twitter: string;
    fair: string;

    constructor(
        uuid: string,
        name: string,
        picture: string,
        description: string,
        email: string,
        whatsapp: string,
        instagram: string,
        twitter: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.email = email;
        this.whatsapp = whatsapp;
        this.instagram = instagram;
        this.twitter = twitter;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getPicture(): string {
        return this.picture;
    }

    public getDescription(): string {
        return this.description;
    }

    public getFair(): string {
        return this.fair;
    }

    public getEmail(): string {
        return this.email;
    }

    public getWhatsapp(): string {
        return this.whatsapp;
    }

    public getInstagram(): string {
        return this.instagram;
    }

    public getTwitter(): string {
        return this.twitter;
    }       

}

export default Speakers;