import { v4 as uuidv4 } from 'uuid';
import Giveaways from './model/giveaways';

class GiveawaysFactory {

    public static giveawaysFromData(data: {
        date: string,
        hour: string,
        name: string,
        fair: string,
        picture: string,
        description: string
    }): Giveaways {
        return new Giveaways(uuidv4(), data.date, data.hour, data.name, data.fair, data.picture, data.description);
    }

    public static createGiveaways(data: {
        uuid: string,
        date: string,
        hour: string,
        name: string,
        fair: string,
        picture: string,
        description: string
    }): Giveaways {
        return new Giveaways(data.uuid, data.date, data.hour, data.name, data.fair, data.picture, data.description);
    }

    public static giveawaysToJson(giveaways: Giveaways) {
        return {
            uuid: giveaways.getUuid(),
            date: giveaways.getDate(),
            hour: giveaways.getHour(),
            name: giveaways.getName(),
            fair: giveaways.getFair(),
            picture: giveaways.getPicture(),
            description: giveaways.getDescription()
        }
    }

}

export default GiveawaysFactory;