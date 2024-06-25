import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  apiBase = environment.apiUrl;

  apiGetPageUser = `${this.apiBase}api/v1/admin/user/get-page`

  constructor(
    private http: HttpClient
  ) { }


  getPageUser():Observable<any>{
    return this.http.get<any>(this.apiGetPageUser);
  }



}
