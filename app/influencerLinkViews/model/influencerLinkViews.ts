class InfluencerLinkViews {

    uuid: string;
    link: string;
    views: number;

    constructor(
        uuid: string,
        link: string,
        views: number
    ) {
        this.uuid = uuid;
        this.link = link;
        this.views = views;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getLink(): string {
        return this.link;
    }

    public getViews(): number {
        return this.views;
    }

}

export default InfluencerLinkViews;