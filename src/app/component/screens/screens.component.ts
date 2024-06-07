import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { Seat } from '../../model/seat';
import { MovieService } from '../../service/movie.service';
import { TheaterService } from '../../service/theater.service';
import { Movie } from '../../model/movies';
import { ScreensService } from '../../service/screens.service';
import { ShowTime } from '../../model/showtime';
import { VnpayService } from '../../service/vnpay.service';
import { Booking } from '../../model/booking';
import { UserBooking } from '../../model/userBooking';
import { StatusBooking } from '../../enum/status-booking';
import { SessionloginService } from '../../service/sessionlogin.service';
import { BookingDetail } from '../../model/bookingdetail';
import { TypeSeat } from '../../enum/type-seat';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.scss'
})
export class ScreensComponent implements OnInit {
  // seats: { row: number, col: number, status: 'available' | 'selected' | 'booked' }[][] = [];
  constructor(
    private bookingService: BookingService
    , private route: ActivatedRoute
    , private notificationService: NotificationService
    , private movieService: MovieService
    , private router: Router
    , private vnpayService: VnpayService
    , private sessionLoginService: SessionloginService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const screenId = +params['screenid'];
      const movieId = +params['movieid'];
      const showtimeId = + params['showtimeid'];
      if (isNaN(screenId) || isNaN(movieId) || isNaN(showtimeId)) {
        this.notificationService.showError('Dữ liệu đầu vào không hợp lệ!');
        return;
      }

     
      if (movieId) {
        this.getMovieById(movieId, 1);
      }
      if (screenId) {
        this.getSeatsByScreen(screenId);
      }
      if (showtimeId) {
        this.getSeatIsBooked(showtimeId);
        this.getShowTimeById(showtimeId);
      }
      this.sessionLoginService.user$.subscribe(user => {
        this.userLg = user;
      });
      this.notificationService.showSuccess('Mời bạn chọn ghế');
    });

  }

  //Nhóm các ghế được chọn theo loại ghế
  groupSeatByType: { [key: string]: any[] } = {};

  seatsL: Seat[] = [];
  seatIsSelected: Seat[] = [];
  seatIsBooked: Seat[] = [];

  rows: { [key: string]: any[] } = {};
  movie!: Movie;
  showtime!: ShowTime;
  screen!: Screen;
  bookingDetailList: BookingDetail[] = [];
  userLg: any;
  booking = {
    user: {
      username: ''
    },
    bookingDate: new Date(),
    totalPrice: 0,
    status: StatusBooking.PENDING,
    bookingdetail: [] = this.bookingDetailList
  };
  totalPrice = 0;






  /**Lấy phim theo id */
  getMovieById(movieId: number, status: number) {
    this.movieService.getDetailMovie(movieId, status).subscribe({
      next: ((resp: Movie) => this.movie = resp)
    })
  }

  /**Lấy suất chiếu theo id */
  getShowTimeById(showtimeid: number) {
    this.bookingService.getShowTimeById(showtimeid).subscribe({
      next: ((resp: ShowTime) => this.showtime = resp)
    })
  }

  /** 
   * Lấy dữ liệu của rạp theo id
   * Render ghế
  */
  getSeatsByScreen(screenId: number) {
    this.bookingService.getSeatByIdScreen(screenId).subscribe({
      next: ((resp: Seat[]) => {
        this.seatsL = resp;
        this.groupSeatByRow();
      })
    })
  }

  /**Lấy ghế đã được đặt */
  getSeatIsBooked(idshowtime: number) {
    this.bookingService.getSeatBooked(idshowtime).subscribe({
      next: (resp: Seat[]) => {
        this.seatIsBooked = resp;
        this.updateSeatStatus();
      }
    });
  }
 /**sửa trạng thái của ghế được dặt */
  updateSeatStatus(): void {
    if (this.seatIsBooked.length > 0 && this.seatsL.length > 0) {
      this.seatIsBooked.forEach(seatB => {
        this.seatsL.forEach(seatL => {
          if (seatB.id === seatL.id) {
            seatL.status = 'reserved';
          }
        });
      });
    }
  }
  



  /**Nhóm các ghế theo hàng */
  groupSeatByRow(): void {
    this.seatsL.forEach(seat => {
      if (!this.rows[seat.seatrow]) {
        this.rows[seat.seatrow] = [];
      }
      this.rows[seat.seatrow].push(seat);
    })
  }

  /**Trả về giá tiền ghế theo seat.type */
  getPriceForSeat(type: string): number {
    if (type === 'STANDARD') {
      return 90000;
    } else if (type === 'VIP') {
      return 100000;
    } else {
      return 200000;
    }
  }


  /**Trả về tổng tiền */
  getTotalPrice(): number {
    this.totalPrice = 0;
    this.seatIsSelected.forEach(seat => {
      this.totalPrice += this.getPriceForSeat(seat.type);
    });
    return this.totalPrice;
  }

  /**Chọn ghế */
  selectSeat(seat: any) {
    if (seat.status === 'available') {
      if (this.seatIsSelected.length >= 9) {
        this.notificationService.showError('Bạn chỉ được chọn tối đa 9 ghế!!');
      } else {
        seat.status = 'selected';
        this.seatIsSelected.push(seat);
        if (!this.groupSeatByType[seat.type]) {
          this.groupSeatByType[seat.type] = [];
        }
        this.groupSeatByType[seat.type].push(seat);
        this.bookingDetailList.push(new BookingDetail(this.showtime, this.getPriceForSeat(seat.type), seat));
      }
    } else if (seat.status === 'selected') {
      // Xóa seat ra khỏi groupSeatByType khi bỏ chọn
      if (this.groupSeatByType[seat.type]) {
        const typeIndex = this.groupSeatByType[seat.type].findIndex(s => s.id === seat.id);
        if (typeIndex !== -1) {
          this.groupSeatByType[seat.type].splice(typeIndex, 1);
        }
      }
      // Xóa 1 phần tử trong danh sách hóa đơn khi bỏ chọn ghế
      if (this.bookingDetailList) {
        const bookingDetailIndex = this.bookingDetailList.findIndex(b => b.seat.id === seat.id);
        if (bookingDetailIndex !== -1) {
          this.bookingDetailList.splice(bookingDetailIndex, 1);
        }
      }
      // Xóa ghế ra khỏi danh sách ghế đã chọn khi  bỏ chọn ghế
      const index = this.seatIsSelected.findIndex(s => s.id === seat.id);
      if (index !== -1) {
        this.seatIsSelected.splice(index, 1);
      }
      seat.status = 'available';
    }
    console.log('Danh sach hoa don detail: ' + JSON.stringify(this.bookingDetailList));
  }

  /**Tạo đặt lịch mới */
  createBooking() {
    if (this.userLg.username) {
      this.booking.user.username = this.userLg.username;
      console.log('Booking: ' + JSON.stringify(this.booking))
      this.bookingService.createBooking(this.booking).subscribe({
        next: ((resp: any) => {
          this.notificationService.showSuccess('Đang chuẩn bị quá trình thanh toán!'),
            this.booking = resp.data,
            this.redirectPayment(resp.data.id)
        }),
        error: (err: any) => {
          this.notificationService.showError(err.error.message)
          console.error(err);
        }
      });
    } else {
      this.notificationService.showError('Đăng nhập để mua vé');
      this.router.navigate(['login-or-rigister']);
    }
  }

  /**Chuyển đến url thanh toán */
  redirectPayment(id_booking: number) {
    this.vnpayService.getPayment(this.getTotalPrice(), id_booking).subscribe({
      next: (response: any) => {
        console.log(response.data);
        console.log("URL Payment: " + response.data);
        window.location.href = response.data;
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
        console.error('Error:', err);
      }
    });
  }

  /**Đặt lịch */
  bookSeats() {
    if (this.seatIsSelected.length === 0) {
      this.notificationService.showError('Bạn chưa chọn ghế nào!');
    } else {
      this.booking.totalPrice = this.getTotalPrice();
      this.createBooking();
    }
  }
}
