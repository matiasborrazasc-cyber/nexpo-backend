import { v4 as uuidv4 } from 'uuid';
import Cupons from './model/cupons';

class CuponsFactory {

    public static createCuponsFromData(data: {
        description: string,
        title: string,
        picture: string,
        fair: string
    }): Cupons {
        return new Cupons(uuidv4(), data.description, data.title, data.picture, data.fair);
    }

    public static createCupons(data: {
        uuid: string,
        description: string,
        title: string,
        picture: string,
        fair: string
    }): Cupons {
        return new Cupons(data.uuid, data.description, data.title, data.picture, data.fair);
    }

    public static cuponsToJson(cupons: Cupons) {
        return {
            uuid: cupons.getUuid(),
            description: cupons.getDescription(),
            title: cupons.getTitle(),
            picture: cupons.getPicture(),
            fair: cupons.getFair()
        }
    }

}

export default CuponsFactory;