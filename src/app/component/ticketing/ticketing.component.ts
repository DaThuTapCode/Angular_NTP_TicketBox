import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingService } from '../../service/booking.service';
import { ShowTime } from '../../model/showtime';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-ticketing',
  standalone: true,
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss'],
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    RouterModule
  ]
})
export class TicketingComponent implements OnInit {
  showtimes: ShowTime[] = [];
  groupedShowtimes: { [theaterName: string]: ShowTime[] } = {};
  theaterNames: string[] = [];
  minDate: Date;
  todayn: Date;
  showdate: Date = new Date();

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.todayn = new Date();
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['movieid'];
      if (movieId) {
        this.getShowTimesByMovieId(movieId, this.showdate);
      }
      this.notificationService.showSuccess('Mời bạn chọn thời gian và địa điểm mua vé');
    });
  }

  getShowTimesByMovieId(movieId: number, date: Date): void {
    const formattedDate = this.formatDate(date); // Định dạng ngày
    this.bookingService.getShowtimeByMovieId(movieId, formattedDate).subscribe(
      (data: ShowTime[]) => {
        this.showtimes = data;
        this.groupShowtimesByTheater();
        console.log(this.showtimes);
      },
      error => {
        console.error(error);
      }
    );
  }

  groupShowtimesByTheater(): void {
    this.groupedShowtimes = this.showtimes.reduce((groups: { [theaterName: string]: ShowTime[] }, showtime) => {
      const theaterName = showtime.screen.theater.name;
      if (!groups[theaterName]) {
        groups[theaterName] = [];
      }
      groups[theaterName].push(showtime);
      return groups;
    }, {});
    this.theaterNames = Object.keys(this.groupedShowtimes);
    console.log(this.theaterNames);
  }

  onDateChange(event: any) {
    console.log('Ngày được chọn: ', event.value);
    this.showdate = event.value;
    this.getShowTimesByMovieId(1, this.showdate); // Thay đổi id phim tùy theo trường hợp của bạn
  }

  // Phương thức để định dạng ngày thành chuỗi yyyy-MM-dd
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.pad(month, 2)}-${this.pad(day, 2)}`;
  }

  // Phương thức để thêm số 0 vào trước các số < 10
  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
