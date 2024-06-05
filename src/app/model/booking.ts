import { StatusBooking } from "../enum/status-booking";
import { UserBooking } from "./userBooking";

export class Booking{
  id: number;
  user: UserBooking;
  bookingdate: Date;
  totalPrice: number;
  status: StatusBooking;

  constructor(data: any){
    this.id = data.id;
    this.user = data.user;
    this.bookingdate = data.bookingdate;
    this.totalPrice = data.total_Price;
    this.status = data.status;
  }

}