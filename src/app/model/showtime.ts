import { Movie } from "./movies";
import { Screen } from "./screen";

export class ShowTime{
    id: number;
    movie: Movie;
    screen: Screen;
    showdate: Date;
    showtime: string;

    constructor(data: any){
        this.id = data.id;
        this.movie = new Movie(data.movie);
        this.screen = new Screen(data.screen);
        this.showdate = data.showdate;
        this.showtime = data.showtime;
    }
}