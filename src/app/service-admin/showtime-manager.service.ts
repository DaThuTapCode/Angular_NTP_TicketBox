import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { Observable } from 'rxjs';
import { ShowTime } from '../model/showtime';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeManagerService {

  apiBase = environment.apiUrl;

  apiGetShowTimeByTheaterIdScreenIdShowDate = `${this.apiBase}api/v1/admin/showtimes/get-show-time-t-s`

  apiPostCreatShowTime = `${this.apiBase}api/v1/admin/showtimes/create`;

  constructor(
    private http: HttpClient,
    private noti: NotificationService
  ) { }

  getShowTimeByTheaterIdScreenIdShowDate(theaterId: number, screenId: number, showDate: string): Observable<ShowTime[]> {
    return this.http.get<any[]>(`${this.apiGetShowTimeByTheaterIdScreenIdShowDate}/${theaterId}/${screenId}/${showDate}`);
  }

  postCreateShowTime(showTimeNew: ShowTime): Observable<ShowTime> {
    return this.http.post<any>(this.apiPostCreatShowTime, showTimeNew);
  }




}
