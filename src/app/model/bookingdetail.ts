import { Seat } from "./seat";
import { ShowTime } from "./showtime";
import { Theater } from "./theater";

export class BookingDetail{
    // private Long id;
 
    bookingId : number;

    showtime: ShowTime;
    
    seat: Seat;

    theater: Theater;

    price: number; 

    constructor(data: any, price: number, seat: Seat){
        
        this.bookingId = 0;

        this.showtime = data;

        this.seat = seat;

        this.theater = data.screen.theater;

        this.price = price;
    }
}