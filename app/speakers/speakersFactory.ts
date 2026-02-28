import { v4 as uuidv4 } from 'uuid';
import Speakers from './model/speakers';

class SpeakersFactory {

    public static createSpeakersFromData(data: {
        name: string,
        picture: string,
        description: string,
        email: string,
        whatsapp: string,
        instagram: string,
        twitter: string,
        fair: string
    }): Speakers {
        return new Speakers(uuidv4(), data.name, data.picture, data.description, data.email, data.whatsapp, data.instagram, data.twitter, data.fair);
    }

    public static createSpeaker(data: {
        uuid: string,
        name: string,
        picture: string,
        description: string,
        email: string,
        whatsapp: string,
        instagram: string,
        twitter: string,
        fair: string
    }): Speakers {
        return new Speakers(data.uuid, data.name, data.picture, data.description, data.email, data.whatsapp, data.instagram, data.twitter, data.fair);
    }

    public static speakersToJson(speakers: Speakers) {
        return {
            uuid: speakers.getUuid(),
            name: speakers.getName(),
            picture: speakers.getPicture(),
            description: speakers.getDescription(),
            email: speakers.getEmail(),
            whatsapp: speakers.getWhatsapp(),
            instagram: speakers.getInstagram(),
            twitter: speakers.getTwitter(),
            fair: speakers.getFair()
        }
    }

}

export default SpeakersFactory;