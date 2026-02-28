class ProductsCategories {

    uuid: string;
    name: string;
    store: string;
    fair: string;

    constructor(
        uuid: string,
        name: string,
        store: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.store = store;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getStore(): string {
        return this.store;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default ProductsCategories;