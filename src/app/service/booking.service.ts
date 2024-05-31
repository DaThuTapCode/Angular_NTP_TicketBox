import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowTime } from '../model/showtime';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiBase = environment.apiUrl;

  private apiGetShowTimeByMovie = `${this.apiBase}api/v1/showtime/movie/`;

  constructor(private http: HttpClient) { }

  getShowtimeByMovieId(movieId: number, showdate: string): Observable<ShowTime[]> {
    
    return this.http.get<any>(`${this.apiGetShowTimeByMovie}${movieId}/${showdate}`).pipe(
      map(data => data.data.map((item: any) => new ShowTime(item)))
    );
  }
 
}
