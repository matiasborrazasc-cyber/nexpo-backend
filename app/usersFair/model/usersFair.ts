class UsersFair {

    uuid: string;
    fair: string;
    user: string;
    name: string | null;

    constructor(
        uuid: string,
        fair: string,
        user: string,
        name: string | null = null
    ) {
        this.uuid = uuid;
        this.fair = fair;
        this.user = user;
        this.name = name;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getFair(): string {
        return this.fair;
    }

    public getUser(): string {
        return this.user;
    }

    public getName(): string | null {
        return this.name;
    }

}

export default UsersFair;