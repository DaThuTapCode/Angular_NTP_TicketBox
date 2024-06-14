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

  getPageTheater(page: number, size: number): Observable<Theater[]>{
    return this.http.get<any[]>(`${this.apiGetPageTheater}?page=${page}&size=${size}`);
  }

  getAllTheater(): Observable<Theater[]>{
    return this.http.get<any[]>(this.apiGetAllTheater);
  }

  postCreateNewTheater(theater: TheaterRequest){
    const formData: FormData = new FormData();
    formData.append('name', theater.name);
    formData.append('email', theater.email);
    formData.append('phone', theater.phone);
    formData.append('location', theater.location);
    formData.append('description', theater.description);
    formData.append('image', theater.image);
    if(theater.file){
      formData.append('file', theater.file, theater.file.name);
    }
    this.http.post(this.apiPostCreateTheater, formData).subscribe({
      next: ((resp: any) => {
        try{
          this.noti.showSuccess(resp.message);
        }catch(error){
          console.error('Error parsing response:', error);
          this.noti.showError(resp.message);
        }
      }),
      error: (error) => {
        console.error('HTTP error:', error);
        this.noti.showError(error.error.message);
      }
    });
    
   
  }

}
