import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowTime } from '../model/showtime';
import { environment } from '../enviroment/environment';
import { Seat } from '../model/seat';
import { Booking } from '../model/booking';
import { BookingDetail } from '../model/bookingdetail';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiBase = environment.apiUrl;

  private apiGetShowTimeByMovie = `${this.apiBase}api/v1/showtime/movie/`;

  private apiGetSeatByScreensId = `${this.apiBase}api/v1/seat/`;

  private apiGetShowTimeByIdShowTime = `${this.apiBase}api/v1/showtime/`;

  private apiCreateBooking = `${this.apiBase}api/v1/booking/create`;

  private apiCreateBookingDetail = `${this.apiBase}api/v1/booking/create`;


  constructor(
    private http: HttpClient
  ) { }


  /**Tạo đặt lịch mới */
  createBooking(booking: any): Observable<Booking>{
      return this.http.post<Booking>(this.apiCreateBooking, booking);
  }

  /**Tạo đặt lịch chi tiết mới */
  createBookingDetail(bookingDetail: BookingDetail): Observable<any>{
    return this.http.post(this.apiCreateBookingDetail, bookingDetail);
  }


  /**Lấy các show time theo phim */
  getShowtimeByMovieId(movieId: number, showdate: string): Observable<ShowTime[]> {
    return this.http.get<any>(`${this.apiGetShowTimeByMovie}${movieId}/${showdate}`).pipe(
      map(data => data.data.map((item: any) => new ShowTime(item)))
    );
  }

  /**Lấy ra showtime theo id showtime */
  getShowTimeById(showtimeId: number): Observable<ShowTime> {
    return this.http.get<any>(`${this.apiGetShowTimeByIdShowTime}${showtimeId}`).pipe(
      map(resp => new ShowTime(resp.data))
    )
  }

  /**Lấy các ghế theo phòng chiếu*/
  getSeatByIdScreen(idscreen: number): Observable<Seat[]> {
    return this.http.get<any>(`${this.apiGetSeatByScreensId}${idscreen}`).pipe(
      map(resp => resp.data.map((item: any) => new Seat(item)))
    );
  }

}
