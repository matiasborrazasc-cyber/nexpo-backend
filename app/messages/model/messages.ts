class Messages {

    uuid: string;
    userSend: string;
    userReceive: string;
    message: string;
    date: string;
    status: string;
    fair: string;

    constructor(
        uuid: string,
        userSend: string,
        userReceive: string,
        message: string,
        date: string,
        status: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.userSend = userSend;
        this.userReceive = userReceive;
        this.message = message;
        this.date = date;
        this.status = status;
        this.fair = fair;
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

    public getMessage(): string {
        return this.message;
    }

    public getDate(): string {
        return this.date;
    }

    public getStatus(): string {
        return this.status;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default Messages;