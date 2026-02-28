class GiveawaysWinners {

    uuid: string;
    giveaways: string;
    user: string;

    constructor(
        uuid: string,
        giveaways: string,
        user: string
    ) {
        this.uuid = uuid;
        this.giveaways = giveaways;
        this.user = user;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getGiveaways(): string {
        return this.giveaways;
    }

    public getUser(): string {
        return this.user;
    }       


}

export default GiveawaysWinners;