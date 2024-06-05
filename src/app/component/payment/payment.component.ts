import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { ShowTime } from '../../model/showtime';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  showtime!: ShowTime;

  constructor(
    private bookingService: BookingService

  ){}
}
