class ConfigFair {

    uuid: string;
    fair: string;

    constructor(
        uuid: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default ConfigFair;