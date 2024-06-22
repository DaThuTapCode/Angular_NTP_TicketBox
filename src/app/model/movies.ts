import { environment } from "../enviroment/environment";

export class Movie {
  push(movieD: Movie | null) {
    throw new Error('Method not implemented.');
  }
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


apiBase = environment.apiUrl;

  constructor(data: any) {
    if (data) {
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
      
      this.image = `${this.apiBase}api/v1/movies/images/${data.image}`;
      this.status = data.status;
    }

  }
}
