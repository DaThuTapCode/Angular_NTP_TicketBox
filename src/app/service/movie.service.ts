import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../model/movies';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrlBase = environment.apiUrl;

  private apiGetAllMovieIsShowing = `${this.apiUrlBase}api/v1/movies/movie-is-showing`;

  private apiGetAllMovieUpcoming = `${this.apiUrlBase}api/v1/movies/movie-upcoming`;

  private apiGetDetailMovie = `${this.apiUrlBase}api/v1/movies/detail-movie/`;

  

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

