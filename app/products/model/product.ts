class Product {

    uuid: string;
    image: string;
    price: number;
    currency: string;
    description: string;
    title: string;    
    category: string;
    store: string;
    fair: string;

    constructor(
        uuid: string,
        image: string,
        price: number,
        currency: string,
        description: string,
        title: string,
        category: string,
        store: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.image = image;
        this.price = price;
        this.currency = currency;
        this.description = description;
        this.title = title;     
        this.category = category;
        this.store = store;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getImage(): string {
        return this.image;
    }

    public getPrice(): number {
        return this.price;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public getDescription(): string {
        return this.description;
    }

    public getTitle(): string {
        return this.title;
    }

    public getCategory(): string {
        return this.category;
    }   

    public getStore(): string {
        return this.store;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default Product;