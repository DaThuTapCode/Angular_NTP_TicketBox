export class Seat{
    id: number;

    seatrow: string;

    seatnumber: number

    type: string;

    status: string;

    constructor(data:any){
        this.id = data.id;
        this.seatrow = data.seatrow;
        this.seatnumber = data.seatnumber;
        this.type = data.type;
        this.status = data.status;
    }
}