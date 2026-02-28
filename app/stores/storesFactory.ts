import { v4 as uuidv4 } from 'uuid';
import Stores from './model/stores';

class StoresFactory {

    public static createStoresFromData(data: {
        name: string,
        description: string,
        portada: string,
        image: string,
        email: string,
        whatsapp: string,
        instagram: string,
        facebook: string,
        user: string,
        category: string,
        typeOfStand: string,
        fair: string
    }): Stores {
        return new Stores(uuidv4(), data.name, data.description, data.portada, data.image, data.email, data.whatsapp, data.instagram, data.facebook, data.user, data.category, data.typeOfStand, data.fair);
    }

    public static createStores(data: {
        uuid: string,
        name: string,
        description: string,
        portada: string,
        image: string,
        email: string,
        whatsapp: string,
        instagram: string,
        facebook: string,
        user: string,
        category: string,
        typeOfStand: string,
        fair: string
    }): Stores {
        return new Stores(data.uuid, data.name, data.description, data.portada, data.image, data.email, data.whatsapp, data.instagram, data.facebook, data.user, data.category, data.typeOfStand, data.fair);
    }

    public static storesToJson(store: Stores) {
        return {
            uuid: store.getUuid(),
            name: store.getName(),
            description: store.getDescription(),
            portada: store.getPortada(),
            image: store.getImage(),
            email: store.getEmail(),
            whatsapp: store.getWhatsapp(),
            instagram: store.getInstagram(),
            facebook: store.getFacebook(),            
            user: store.getUser(),
            category: store.getCategory(),
            typeOfStand: store.getTypeOfStand(),
            fair: store.getFair()
        }
    }

}

export default StoresFactory;