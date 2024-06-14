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

  private apiGetAllMovie = `${this.apiUrlBase}api/v1/admin/movies/all`;

  private apiGetAllMovieEnable = `${this.apiUrlBase}api/v1/admin/movies/status1`;


  // getAllMovies(page: number, size: number): Observable<ResponsePageData<Movie>> {
  //   return this.http.get<ResponsePageData<Movie>>(`${this.baseUrl}/all?page=${page}&size=${size}`);
  // }

  // getAllMovies(page: number, size: number): Observable<Movie[]>{
  //   return this.http.get<any>(`${this.apiGetAllMovie}?page=${page}&size=${size}`).pipe(
  //     map(data => data.data.map((movieData: any) => new Movie(movieData)))
  //   );
  // }
  getAllMovies(page: number, size: number): Observable<Movie[]>{
    return this.http.get<any>(`${this.apiGetAllMovie}?page=${page}&size=${size}`);
  }

  getAllMovieEnable(): Observable<Movie[]>{
    return this.http.get<any[]>(this.apiGetAllMovieEnable);
  }

  createNewMovie(movieNew: MovieRequest) {
    const formData: FormData = new FormData();
    formData.append('title', movieNew.title);
    formData.append('descriptions', movieNew.descriptions);
    formData.append('duration', movieNew.duration.toString());
    formData.append('releasedate', movieNew.releasedate);
    formData.append('genre', movieNew.genre);
    formData.append('language', movieNew.language);
    formData.append('performers', movieNew.performers);
    formData.append('director', movieNew.director);
    formData.append('trailer', movieNew.trailer);
    formData.append('status', movieNew.status.toString());
    console.log(movieNew.releasedate)
    if (movieNew.file) {
      formData.append('file', movieNew.file, movieNew.file.name);
    }
    this.http.post(this.apiCreateNewMovie, formData)
      .subscribe({
        next: (resp: any) => {
          try {
            // alert(resp.message);
            this.noti.showSuccess(resp.message);
          } catch (error) {
            console.error('Error parsing response:', error);
            // alert(resp.message);
            alert(error);
            this.noti.showError(resp.message);
          }
        },
        error: (err) => {
          console.error('HTTP error:', err);
          this.noti.showError(err.error.message)
        }
      });
  }
}
