import { v4 as uuidv4 } from 'uuid';
import GiveawaysWinners from './model/giveawaysWinners';

class GiveawaysWinnersFactory {

    public static createGiveawaysWinnersFromData(data: {
        giveaways: string,
        user: string
    }): GiveawaysWinners {
        return new GiveawaysWinners(uuidv4(), data.giveaways, data.user);
    }

    public static createGiveawaysWinners(data: {
        uuid: string,
        giveaways: string,
        user: string
    }): GiveawaysWinners {
        return new GiveawaysWinners(data.uuid, data.giveaways, data.user);
    }

    public static giveawaysWinnersToJson(giveawaysWinners: GiveawaysWinners) {
        return {
            uuid: giveawaysWinners.getUuid(),
            giveaways: giveawaysWinners.getGiveaways(),
            user: giveawaysWinners.getUser()
        }
    }

}

export default GiveawaysWinnersFactory;