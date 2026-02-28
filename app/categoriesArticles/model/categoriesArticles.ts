class CategoriesArticles {

    uuid: string;
    name: string;
    fair: string;

    constructor(
        uuid: string,
        name: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default CategoriesArticles;