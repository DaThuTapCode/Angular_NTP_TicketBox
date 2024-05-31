import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../model/movies';
import { environment } from '../enviroment/environment';
import { data } from 'jquery';
import { MovieRequest } from '../request-model/movie/movie-request';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrlBase = environment.apiUrl;

  private apiGetAllMovieIsShowing = `${this.apiUrlBase}api/v1/movies/movie-is-showing`;

  private apiGetAllMovieUpcoming = `${this.apiUrlBase}api/v1/movies/movie-upcoming`;

  private apiGetDetailMovie = `${this.apiUrlBase}api/v1/movies/detail-movie/`;

  private apiCreateNewMovie = `${this.apiUrlBase}api/v1/admin/movies/add`


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

            alert(resp.message);

          } catch (error) {
            console.error('Error parsing response:', error);
            alert(resp.message);
          }
        },
        error: (err) => {
          console.error('HTTP error:', err);
          alert(err.error.message);
        }
      });
  }

  constructor(private http: HttpClient) { }
  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.apiGetAllMovieIsShowing).pipe(
      map(data => data.data.map((movieData: any) => new Movie(movieData)))
    );
  }

  getMovieUpcoming(): Observable<Movie[]> {
    // (this.http.get<any>(this.apiGetAllMovieUpcoming).subscribe({
    //   next: (resp: any) => {
    //     console.log(resp)
    //   }
    // }));
    return this.http.get<any>(this.apiGetAllMovieUpcoming).pipe(
      map(resp => resp.data.map((movieUpcoming: any) => new Movie(movieUpcoming)))
    );
  }


  getDetailMovie(id: number, status: number): Observable<Movie> {
    const apiUrl = `${this.apiGetDetailMovie}${id}/${status}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => new Movie(response.data))
    );
  }


}

