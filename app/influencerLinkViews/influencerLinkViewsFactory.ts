import { v4 as uuidv4 } from 'uuid';
import InfluencerLinkViews from './model/influencerLinkViews';

class InfluencerLinkViewsFactory {

    public static createInfluencerLinkViewsFromData(data: {
        link: string,
        views: number,
    }): InfluencerLinkViews {
        return new InfluencerLinkViews(uuidv4(), data.link, data.views);
    }

    public static createInfluencerLinkViews(data: {
        uuid: string,
        link: string,
        views: number
    }): InfluencerLinkViews {
        return new InfluencerLinkViews(data.uuid, data.link, data.views);
    }

    public static influencerLinkViewsToJson(influencerLinkViews: InfluencerLinkViews) {
        return {
            uuid: influencerLinkViews.getUuid(),
            name: influencerLinkViews.getLink(),
            email: influencerLinkViews.getViews()
        }
    }

}

export default InfluencerLinkViewsFactory;