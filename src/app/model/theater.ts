export class Theater {
    id: number;
    name: string;
    location: string;
    image: string;
    phone: string;
    email: string;
    description: string;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.location = data.location;
        this.image = data.image;
        this.phone = data.phone;
        this.email = data.email;
        this.description = data.description;
    }

}
