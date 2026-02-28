class BannerPublicityViews {

    uuid: string;
    banner: string;
    views: number;

    constructor(
        uuid: string,
        banner: string,
        views: number
    ) {
        this.uuid = uuid;
        this.banner = banner;
        this.views = views;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getBanner(): string {
        return this.banner;
    }

    public getViews(): number {
        return this.views;
    }

}

export default BannerPublicityViews;