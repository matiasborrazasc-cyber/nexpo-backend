class Articles {

    uuid: string;
    description: string;
    name: string;
    imagen: string;
    url: string;
    fair: string;
    category: string;

    constructor(
        uuid: string,
        description: string,
        name: string,
        imagen: string,
        url: string,
        fair: string,
        category: string,
    ) {
        this.uuid = uuid;
        this.description = description;
        this.name = name;
        this.imagen = imagen;
        this.url = url;
        this.fair = fair;
        this.category = category;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getDescription(): string {
        return this.description;
    }

    public getName(): string {
        return this.name;
    }

    public getImagen(): string {
        return this.imagen;
    }

    public getUrl(): string {
        return this.url;
    }

    public getCategory(): string {
        return this.category;
    }

    public getFair(): string {
        return this.fair;
    }

}

export default Articles;