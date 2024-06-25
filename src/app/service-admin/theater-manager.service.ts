import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { Observable, map } from 'rxjs';
import { Theater } from '../model/theater';
import { TheaterRequest } from '../request-model/movie/theater-request';
import { NotificationService } from '../service/notification.service';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class TheaterManagerService {

  constructor(
    private http: HttpClient
    , private noti: NotificationService
  ) { }

  apiBase = environment.apiUrl;

  apiGetPageTheater = `${this.apiBase}api/v1/admin/theaters/page`;

  apiGetAllTheater = `${this.apiBase}api/v1/admin/theaters/all`;

  apiPostCreateTheater = `${this.apiBase}api/v1/admin/theaters/create`;

  apiGetTheaterById = `${this.apiBase}api/v1/admin/theaters/`;

  apiPutUpdateTheater = `${this.apiBase}api/v1/admin/theaters/update/`

  getPageTheater(page: number, size: number): Observable<Theater[]>{
    return this.http.get<any[]>(`${this.apiGetPageTheater}?page=${page}&size=${size}`);
  }

  getAllTheater(): Observable<Theater[]>{
    return this.http.get<any[]>(this.apiGetAllTheater);
  }

  getTheaterById(id: number): Observable<Theater>{
    return this.http.get<any>(`${this.apiGetTheaterById}${id}`);
  }

  updateTheater(theaterId: number, formData: FormData):Observable<any>{
    return this.http.put(`${this.apiPutUpdateTheater}${theaterId}`, formData);
  }

  postCreateNewTheater(formData: FormData): Observable<any>{
   return  this.http.post(this.apiPostCreateTheater, formData);
  
  }

}
