class CommentsEventCalendar {

    uuid: string;
    comment: string;
    user: string;
    event: string;

    constructor(
        uuid: string,
        comment: string,
        user: string,
        event: string,
    ) {
        this.uuid = uuid;
        this.comment = comment;
        this.user = user;
        this.event = event;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getComment(): string {
        return this.comment;
    }

    public getUser(): string {
        return this.user;
    }

    public getEvent(): string {
        return this.event;
    }


}

export default CommentsEventCalendar;