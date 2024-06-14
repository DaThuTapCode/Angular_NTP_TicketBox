import { Movie } from "./movies";
import { Screen } from "./screen";

export class ShowTime{
    id: number | null;
    movie: Movie | null;
    screen: Screen | null;
    showdate: Date | null | any;
    showtime: string;

    constructor(data: any){
        this.id = data.id;
        this.movie = new Movie(data.movie);
        this.screen = new Screen(data.screen);
        this.showdate = data.showdate;
        this.showtime = data.showtime;
    }
}