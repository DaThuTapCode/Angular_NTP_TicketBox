import { StatusBooking } from "../enum/status-booking";
import { BookingDetail } from "./bookingdetail";
import { UserBooking } from "./userBooking";

export class Booking{
  id: number;
  user: UserBooking;
  bookingdate: Date;
  totalPrice: number;
  status: StatusBooking;
  orderinfo: string;
  transactioncode: string;
  bookingdetail:  BookingDetail[];

  constructor(data: any){
    this.id = data.id;
    this.user = data.user;
    this.bookingdate = data.bookingdate;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.orderinfo = data.orderinfo;
    this.transactioncode = data.transactioncode;
    this.bookingdetail = data.bookingdetail;
  }

}