import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { MovieRequest } from '../request-model/movie/movie-request';
import { NotificationService } from '../service/notification.service';
import { Observable, map } from 'rxjs';
import { Movie } from '../model/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieManagerService {
  constructor(
    private http: HttpClient
    , private noti: NotificationService
  
  ) { }

  private apiUrlBase = environment.apiUrl;

  private apiCreateNewMovie = `${this.apiUrlBase}api/v1/admin/movies/add`;

  private apiUpdateMovie = `${this.apiUrlBase}api/v1/admin/movies/update/`;

  private apiGetAllMovie = `${this.apiUrlBase}api/v1/admin/movies/all`;

  private apiGetAllMovieEnable = `${this.apiUrlBase}api/v1/admin/movies/status1`;

  getAllMovies(page: number, size: number): Observable<Movie[]>{
    return this.http.get<any>(`${this.apiGetAllMovie}?page=${page}&size=${size}`);
  }

  getAllMovieEnable(): Observable<Movie[]>{
    return this.http.get<any[]>(this.apiGetAllMovieEnable);
  }

  createNewMovie(formData: FormData): Observable<any>{
    return this.http.post(this.apiCreateNewMovie, formData);
  }
  updateMovie(formData: FormData, id: number) :Observable<any> {
   return this.http.put(`${this.apiUpdateMovie}${id}`, formData);
  }
}
