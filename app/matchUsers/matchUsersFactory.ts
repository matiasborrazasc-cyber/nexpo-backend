import { v4 as uuidv4 } from 'uuid';
import MatchUsers from './model/matchUsers';

class MatchUsersFactory {

    public static createMatchUsersFromData(data: {
        uuid: string,
        userSend: string,
        userReceive: string,
        fair: string,
        status: string
    }): MatchUsers {
        return new MatchUsers(uuidv4(), data.userSend, data.userReceive, data.status ?? "pending", data.fair);
    }

    public static createMatchUsers(data: {
        uuid: string,
        userSend: string,
        userReceive: string,
        fair: string,
        status: string
    }): MatchUsers {
        return new MatchUsers(data.uuid, data.userSend, data.userReceive, data.status, data.fair);
    }

    public static matchUsersToJson(matchUsers: MatchUsers) {
        return {
            uuid: matchUsers.getUuid(),
            userSend: matchUsers.getUserSend(),
            userReceive: matchUsers.getUserReceive(),
            fair: matchUsers.getFair(),
            status: matchUsers.getStatus()
        }
    }

}

export default MatchUsersFactory;