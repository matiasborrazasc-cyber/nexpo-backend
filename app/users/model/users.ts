class Users {

    uuid: string;
    name: string;
    email: string;
    role: string | null;
    password: string;
    picture: string | null;
    description: string | null;


    constructor(
        uuid: string,
        name: string,
        email: string,
        role: string | null,
        password: string,
        picture: string | null,
        description: string | null
    ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.picture = picture;
        this.description = description;
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

    public getRole(): string | null {
        return this.role;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPicture(): string | null {
        return this.picture;
    }

    public getDescription(): string | null {
        return this.description;
    }

}

export default Users;