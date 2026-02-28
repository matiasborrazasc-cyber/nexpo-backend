import { v4 as uuidv4 } from 'uuid';
import BannerPublicity from './model/bannerPublicity';

class BannerPublicityFactory {

    public static createBannerPublicityFromData(data: {
        url: string,
        name: string,
        section: string,
        fair: string,
        sponsor: string
    }): BannerPublicity {
        return new BannerPublicity(uuidv4(), data.url, data.section, data.fair, data.sponsor, data.name);
    }

    public static createBannerPublicity(data: {
        uuid: string,
        name: string,
        url: string,
        section: string,
        fair: string,
        sponsor: string,
        views?: number
    }): BannerPublicity {
        return new BannerPublicity(data.uuid, data.url, data.section, data.fair, data.sponsor, data.name, data.views ?? 0);
    }

    public static bannerPublicityToJson(bannerPublicity: BannerPublicity) {
        return {
            uuid: bannerPublicity.getUuid(),
            url: bannerPublicity.getUrl(),
            section: bannerPublicity.getSection(),
            fair: bannerPublicity.getFair(),
            sponsor: bannerPublicity.getSponsor(),
            name: bannerPublicity.getName(),
            views: bannerPublicity.getViews()
        }
    }

}

export default BannerPublicityFactory;