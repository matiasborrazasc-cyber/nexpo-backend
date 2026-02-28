class MatchUsers {

    uuid: string;
    userSend: string;
    userReceive: string;
    fair: string;
    status: string;

    constructor(
        uuid: string,
        userSend: string,
        userReceive: string,
        status: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.userSend = userSend;
        this.userReceive = userReceive;
        this.fair = fair;
        this.status = status;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getUserSend(): string {
        return this.userSend;
    }   

    public getUserReceive(): string {
        return this.userReceive;
    }

    public getFair(): string {
        return this.fair;
    }

    public getStatus(): string {
        return this.status;
    }

}

export default MatchUsers;