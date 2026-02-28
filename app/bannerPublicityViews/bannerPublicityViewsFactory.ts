import { v4 as uuidv4 } from 'uuid';
import BannerPublicityViews from './model/bannerPublicityViews';

class BannerPublicityViewsFactory {

    public static createBannerPublicityViewsFromData(data: {
        banner: string,
        views: number
    }): BannerPublicityViews {
        return new BannerPublicityViews(uuidv4(), data.banner, data.views);
    }

    public static createBannerPublicityViews(data: {
        uuid: string,
        banner: string,
        views: number
    }): BannerPublicityViews {
        return new BannerPublicityViews(data.uuid, data.banner, data.views);
    }

    public static bannerPublicityViewsToJson(bannerPublicityViews: BannerPublicityViews) {
        return {
            uuid: bannerPublicityViews.getUuid(),
            name: bannerPublicityViews.getBanner(),
            views: bannerPublicityViews.getViews()
        }
    }

}

export default BannerPublicityViewsFactory;