class Admin {

    uuid: string;
    name: string;
    email: string;
    password: string;
    role: string;
    fair: any;

    constructor(
        uuid: string,
        name: string,
        email: string,
        role: string,
        password: string,
        fair: any
    ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getRole(): string {
        return this.role;
    }

    public getPassword(): string {
        return this.password;
    }

    public getFair(): any {
        return this.fair;
    }

}

export default Admin;