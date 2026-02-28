import { v4 as uuidv4 } from 'uuid';
import UsersFair from './model/usersFair';

class UsersFairFactory {

    public static createUsersFairFromData(data: {
        fair: string,
        user: string
    }): UsersFair {
        return new UsersFair(uuidv4(), data.fair, data.user);
    }

    public static createUsersFair(data: {
        uuid: string,
        fair: string,
        user: string,
        name: string | null
    }): UsersFair {
        return new UsersFair(data.uuid, data.fair, data.user, data.name);
    }

    public static usersFairToJson(usersFair: UsersFair) {
        return {
            uuid: usersFair.getUuid(),
            fair: usersFair.getFair(),
            user: usersFair.getUser(),
            name: usersFair.getName()
        }
    }

}

export default UsersFairFactory;