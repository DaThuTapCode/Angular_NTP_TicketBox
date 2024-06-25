import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { Booking } from '../../model/booking';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{


  bookingId!: number;
  booking!: Booking;

  screenName =  '';
  logoUrl = 'assets/img/logo-brand-ntp-4.jpg'

  constructor(
    private bookingService: BookingService
    , private route: ActivatedRoute
    , private noti: NotificationService
    , private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = params['bookingId'];
      this.loadPaymentResult(this.bookingId);
    });


  }

  loadPaymentResult(bookingId: number){
    this.bookingService.getPaymentResult(bookingId).subscribe({
      next: ((value: any) => {
       this.booking = new Booking(value.data);
      //  console.log(value.data);
        // console.log(this.booking);
       this.screenName = value.data.bookingdetail[0].showtime.screenname;
      }),
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['/not-found']);
      } 
    })
  }


}
