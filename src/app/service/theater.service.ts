import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { Observable } from 'rxjs';
import { Theater } from '../model/theater';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  private apiBase = environment.apiUrl;
  private apiTheaterGetAll = `${this.apiBase}api/v1/theaters/all`;

  


  constructor(private http: HttpClient) { }

  
  getAllTheater(): Observable<Theater[]> {
    return this.http.get<Theater[]>(this.apiTheaterGetAll);
  }
}
