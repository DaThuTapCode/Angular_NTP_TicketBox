export class Theater {
    id: number;
    name: string;
    location: string;
    image: string;
    phone: string;
    email: string;
    description: string;
  value: any;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.location = data.location;
        this.image = 'http://localhost:8080/api/v1/movies/images/' + data.image;
        this.phone = data.phone;
        this.email = data.email;
        this.description = data.description;
    }

}
