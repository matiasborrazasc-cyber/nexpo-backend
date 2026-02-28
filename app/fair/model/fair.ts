class Fair {

    uuid: string;
    name: string;
    logo: string;
    finishDate: string;
    startDate: string;
    description: string;
    country: string;
    city: string;
    
    constructor(
        uuid: string,
        name: string,
        logo: string,
        finishDate: string,
        startDate: string,
        description: string,
        country: string,
        city: string
    ) {
        this.uuid = uuid;
        this.logo = logo;
        this.finishDate = finishDate;
        this.startDate = startDate;
        this.description = description;
        this.country = country; 
        this.city = city;
        this.name = name;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public getLogo(): string {
        return this.logo;
    }

    public getFinishDate(): string {
        return this.finishDate;
    }

    public getStartDate(): string {
        return this.startDate;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCountry(): string {
        return this.country;
    }

    public getCity(): string {
        return this.city;
    }

}

export default Fair;