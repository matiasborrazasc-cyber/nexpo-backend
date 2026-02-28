import { v4 as uuidv4 } from 'uuid';
import Influencer from './model/influencer';

class InfluencerFactory {

    public static createInfluencerFromData(data: {
        name: string,
        email: string,
        link: string,
        redirection: string,
        fair: string
    }): Influencer {
        return new Influencer(uuidv4(), data.name, data.email, data.link, data.redirection, data.fair);
    }

    public static createInfluencer(data: {
        uuid: string,
        name: string,
        email: string,
        link: string,
        redirection: string,
        fair: string
    }): Influencer {
        return new Influencer(data.uuid, data.name, data.email, data.link, data.redirection, data.fair);
    }

    public static influencerToJson(influencer: Influencer) {
        return {
            uuid: influencer.getUuid(),
            name: influencer.getName(),
            email: influencer.getEmail(),
            link: influencer.getLink(),
            fair: influencer.getFair(),
            redirection: influencer.getRedirection()
        }
    }

}

export default InfluencerFactory;