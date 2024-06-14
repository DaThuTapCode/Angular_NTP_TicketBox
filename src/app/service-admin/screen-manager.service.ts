import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { Observable } from 'rxjs';
import { Screen } from '../model/screen';

@Injectable({
  providedIn: 'root'
})
export class ScreenManagerService {

  constructor(
    private http: HttpClient
  ) { }

  apiBase = environment.apiUrl;

  apiGetAllScreenByTheater = `${this.apiBase}api/v1/admin/screens/get-by-theater/`;
  apiGetPageScreen = ``;
  apiCreateScren = ``;
  apiUpdateScreen = ``;

  getAllScreensByTheater(theaterId: number): Observable<Screen[]>{
      return this.http.get<any[]>(`${this.apiGetAllScreenByTheater}${theaterId}`);
  }

}
