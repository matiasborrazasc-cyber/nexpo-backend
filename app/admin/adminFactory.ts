import { v4 as uuidv4 } from 'uuid';
import Admin from './model/admin';

class AdminFactory {

    public static createAdminFromData(data: {
        name: string,
        email: string,
        role: string,
        password: string,
        fair: string
    }): Admin {
        return new Admin(uuidv4(), data.name, data.email, data.role, data.password, data.fair);
    }

    public static createAdmin(data: {
        uuid: string,
        name: string,
        email: string,
        role: string,
        password: string,
        fair: any
    }): Admin {
        return new Admin(data.uuid, data.name, data.email, data.role, data.password, data.fair);
    }

    public static adminToJson(admin: Admin) {
        return {
            uuid: admin.getUuid(),
            name: admin.getName(),
            email: admin.getEmail(),
            role: admin.getRole(),
            fair: admin.getFair()
        }
    }

}

export default AdminFactory;