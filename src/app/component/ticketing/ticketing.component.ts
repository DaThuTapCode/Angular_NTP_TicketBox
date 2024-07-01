import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingService } from '../../service/booking.service';
import { ShowTime } from '../../model/showtime';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movies';

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
  movieId!: number;

  movie!: Movie;
  constructor(
    private bookingService: BookingService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.todayn = new Date();
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['movieid'];
      if (isNaN(movieId)) {
        this.notificationService.showError('Dữ liệu đầu vào không hợp lệ!');
        this.router.navigate(['/not-found'])
        return;
      }
      if (movieId) {
        this.movieId = movieId;
        this.getShowTimesByMovieId(movieId, this.showdate);
        this.getMovieById(movieId);
      }
    });
  }

  getShowTimesByMovieId(movieId: number, date: Date): void {
    const formattedDate = this.formatDate(date); // Định dạng ngày
    this.bookingService.getShowtimeByMovieId(movieId, formattedDate).subscribe({
      next: (data: ShowTime[]) => {
        this.showtimes = data;
        this.groupShowtimesByTheater();
        if (this.showtimes.length === 0) {
          this.notificationService.showWarning('Opp! Hôm nay không có lịch chiếu, mời bạn chọn ngày khác nhé!')
        }
        //console.log(this.showtimes);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getMovieById(movieId: number) {
    this.movieService.getDetailMovie(movieId, 1).subscribe({
      next: (value: Movie) => {
        this.movie = value;
      }
    });
  }

  groupShowtimesByTheater(): void {
    this.groupedShowtimes = this.showtimes.reduce((groups: { [theaterName: string]: ShowTime[] }, showtime) => {
      if (showtime.screen) {
        const theaterName = showtime.screen.theater.name;
        if (!groups[theaterName]) {
          groups[theaterName] = [];
        }
        groups[theaterName].push(showtime);
        return groups;
      } else {
        return groups;
      }

    }, {});
    this.theaterNames = Object.keys(this.groupedShowtimes);
    console.log(this.theaterNames);
  }

  onDateChange(event: any) {
    console.log('Ngày được chọn: ', event.value);
    this.showdate = event.value;
    this.getShowTimesByMovieId(this.movieId, this.showdate); // Thay đổi id phim tùy theo trường hợp 
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.pad(month, 2)}-${this.pad(day, 2)}`;
  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  // redirectToScreens(showtime: ShowTime) {
  //   let date = new Date();
  //   let currentDate = `${date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:${date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getFullYear()}-${this.pad(date.getMonth(), 2)}-${this.pad(date.getDate(), 2)}`;

  //   let time = showtime.showtime + ' ' + showtime.showdate;

  //   if(currentDate < time){
  //     this.router.navigate([`/screen/${showtime.movie?.id}/${showtime.screen?.id}/${showtime.id}`]);
  //   }else{
  //     alert('Đã quá giờ mua vé')
  //   }
  // }
}
