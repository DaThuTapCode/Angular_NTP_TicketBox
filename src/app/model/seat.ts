import { TypeSeat } from "../enum/type-seat";

export class Seat{
    id: number;

    seatrow: string;

    seatnumber: number;

    screenid: number

    type: TypeSeat;

    status: string;

    constructor(data:any){
        this.id = data.id;
        this.seatrow = data.seatrow;
        this.seatnumber = data.seatnumber;
        this.type = data.type;
        this.status = data.status;
        this.screenid = data.screenid;
    }
}