class Stores {

    uuid: string;
    name: string;
    description: string;
    portada: string;
    image: string;
    email: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    user: string;
    category: string;
    typeOfStand: string;
    fair: string;

    constructor(
        uuid: string,
        name: string,
        description: string,
        portada: string,
        image: string,
        email: string,
        whatsapp: string,
        instagram: string,
        facebook: string,
        user: string,
        category: string,
        typeOfStand: string,
        fair: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.portada = portada;
        this.image = image;
        this.email = email;
        this.whatsapp = whatsapp;
        this.instagram = instagram;
        this.facebook = facebook;
        this.user = user;
        this.category = category;
        this.typeOfStand = typeOfStand;
        this.fair = fair;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPortada(): string {
        return this.portada;
    }

    public getImage(): string {
        return this.image;
    }

    public getEmail(): string {
        return this.email;
    }

    public getWhatsapp(): string {
        return this.whatsapp;
    }

    public getInstagram(): string {
        return this.instagram;
    }

    public getFacebook(): string {
        return this.facebook;
    }

    public getUser(): string {
        return this.user;
    }

    public getCategory(): string {
        return this.category;
    }

    public getTypeOfStand(): string {
        return this.typeOfStand;
    }

    public getFair(): string {
        return this.fair;
    }
}

export default Stores;