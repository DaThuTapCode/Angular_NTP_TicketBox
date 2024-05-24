import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../model/movies';
import { environment } from '../component/enviroment/environment';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private  apiUrlBase = environment.apiUrl;

  private apiGetAllMovieStatus1 = `${this.apiUrlBase}api/v1/movies/status1`;

  private apiGetDetailMovie = `${this.apiUrlBase}api/v1/movies/detail-movie/`;


  constructor(private http: HttpClient) { }
  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.apiGetAllMovieStatus1).pipe(
      map(data => data.data.map((movieData: any) => new Movie(movieData)))
    );
  }


  getDetailMovie(id: number, status: number): Observable<Movie> {
    const apiUrl = `${this.apiGetDetailMovie}${id}/${status}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => new Movie(response.data))
    );
  }
}
//      map(data => data.data.movieResponseList.map((movieData: any) => new Movie(movieData)))

