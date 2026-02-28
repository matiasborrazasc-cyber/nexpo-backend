class Influencer {

    uuid: string;
    name: string;
    email: string;
    link: string;
    redirection: string;
    fair: string;

    constructor(
        uuid: string,
        name: string,
        email: string,
        link: string,
        redirection: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.link = link;
        this.redirection = redirection;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getFair(): string {
        return this.fair;
    }

    public getLink(): string {
        return this.link;
    }

    public getRedirection(): string {
        return this.redirection;
    }

}

export default Influencer;