import { v4 as uuidv4 } from 'uuid';
import Fair from './model/fair';

class FairFactory {

    public static fairFromData(data: {
        name: string,
        logo: string,
        finishDate: string,
        startDate: string,
        description: string,
        country: string,
        city: string
    }): Fair {
        return new Fair(uuidv4(), data.name, data.logo, data.finishDate, data.startDate, data.description, data.country, data.city);
    }

    public static createFair(data: {
        uuid: string,
        name: string,
        logo: string,
        finishDate: string,
        startDate: string,
        description: string,
        country: string,
        city: string
    }): Fair {
        return new Fair(data.uuid, data.name, data.logo, data.finishDate, data.startDate, data.description, data.country, data.city);
    }

    public static fairToJson(fair: Fair) {
        return {
            uuid: fair.getUuid(),
            name: fair.getName(),
            logo: fair.getLogo(),
            finishDate: fair.getFinishDate(),
            startDate: fair.getStartDate(),
            description: fair.getDescription(),
            country: fair.getCountry(),
            city: fair.getCity()
        }
    }

}

export default FairFactory;