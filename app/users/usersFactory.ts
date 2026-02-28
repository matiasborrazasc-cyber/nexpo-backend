import { v4 as uuidv4 } from 'uuid';
import Users from './model/users';

class UsersFactory {

    public static createUsersFromData(data: {
        name: string,
        email: string,
        role: string | null,
        password: string,
        picture: string | null,
        description: string | null
    }): Users {
        return new Users(uuidv4(), data.name, data.email, data.role, data.password, data.picture, data.description);
    }

    public static createUsers(data: {
        uuid: string,
        name: string,
        email: string,
        role: string | null,
        password: string,
        picture: string | null,
        description: string | null
    }): Users {
        return new Users(data.uuid, data.name, data.email, data.role, data.password, data.picture, data.description);
    }

    public static usersToJson(users: Users) {
        return {
            uuid: users.getUuid(),
            name: users.getName(),
            email: users.getEmail(),
            role: users.getRole(),
            picture: users.getPicture(),
            description: users.getDescription()
        }
    }

}

export default UsersFactory;