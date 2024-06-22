import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { Observable } from 'rxjs';
import { Seat } from '../model/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatManagerService {

  private apiBase  = environment.apiUrl;

  private apiGetSeatByScreenId = `${this.apiBase}api/v1/admin/seat/get-by-screen/`
  
  private apiPostCreateSingleSeat = `${this.apiBase}api/v1/admin/seat/create`

  private apiPutUpdateSeatType = `${this.apiBase}api/v1/admin/seat/update-type-seat/`

  private apiDeleteSeat = `${this.apiBase}api/v1/admin/seat/delete-seat/`

  constructor(
    private http: HttpClient
  ) { }

  getSeatByScreenId(screenId: number): Observable<Seat[]>{
    return this.http.get<any[]>(`${this.apiGetSeatByScreenId}${screenId}`);
  }

  createSingleSeat(seat: Seat): Observable<any>{

   return  this.http.post(this.apiPostCreateSingleSeat, seat);
  }


  updateTypeSeat(id: number, newType: string): Observable<any> {
    return this.http.put<any>(`${this.apiPutUpdateSeatType}${id}?newType=${newType}`, {});
  }

  deleteStatusSeat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiDeleteSeat}${id}`, {});
  }

}
