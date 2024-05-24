export class Movie {
    id!: number;
    title!: string;
    description!: string;
    duration!: number;
    releaseDate!: Date;
    genre!: string;
    language!: string;
    performers!: string;
    director!: string;
    trailer!: string;
    image!: string;
    status!: number;
    


    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.descriptions;
        this.duration = data.duration;
        this.releaseDate = data.releasedate;
        this.genre = data.genre;
        this.language = data.language;
        this.performers = data.performers;
        this.director = data.director;
        this.trailer = data.trailer;
        this.image = 'http://localhost:8080/api/v1/movies/images/' + data.image;
        this.status = data.status;
      }
}
