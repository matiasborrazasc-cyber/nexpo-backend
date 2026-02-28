class BannerPublicity {

    uuid: string;
    url: string;
    section: string;
    fair: string;
    sponsor: string;
    name: string;
    views: number;

    constructor(
        uuid: string,
        url: string,
        section: string,
        fair: string,
        sponsor: string,
        name: string,
        views: number = 0
    ) {
        this.uuid = uuid;
        this.url = url;
        this.section = section;
        this.fair = fair;
        this.sponsor = sponsor;
        this.name = name;
        this.views = views;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getSponsor(): string {
        return this.sponsor;
    }

    public getFair(): string {
        return this.fair;
    }
    
    public getUrl(): string {
        return this.url;
    }

    public getSection(): string {
        return this.section;
    }

    public getViews(): number {
        return this.views;
    }

}

export default BannerPublicity;