import { v4 as uuidv4 } from 'uuid';
import Sponsors from './model/sponsors';

class SponsorsFactory {

    public static createSponsorsFromData(data: {
        name: string;
        description: string;
        image: string;
        email: string;
        phone: string;
        fair: string;
    }): Sponsors {
        return new Sponsors(
            uuidv4(),
            data.name,
            data.description ?? '',
            data.image ?? '',
            data.email,
            data.phone,
            data.fair
        );
    }

    public static createSponsor(data: {
        uuid: string;
        name: string;
        description: string;
        image: string;
        email: string;
        phone: string;
        fair: string;
    }): Sponsors {
        return new Sponsors(
            data.uuid,
            data.name,
            data.description ?? '',
            data.image ?? '',
            data.email,
            data.phone,
            data.fair
        );
    }

    public static sponsorsToJson(sponsors: Sponsors) {
        return {
            uuid: sponsors.getUuid(),
            name: sponsors.getName(),
            description: sponsors.getDescription(),
            image: sponsors.getImage(),
            email: sponsors.getEmail(),
            phone: sponsors.getPhone(),
            fair: sponsors.getFair()
        };
    }
}

export default SponsorsFactory;
