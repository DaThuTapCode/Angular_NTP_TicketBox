import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(
    private http: HttpClient
  ) { }

  private apiBase = environment.apiUrl;
  private apiGetHistoryTransaction = `${this.apiBase}api/v1/booking/transaction-history`;

  getTransactionHistory(): Observable<any[]>{
      return this.http.get<any[]>(this.apiGetHistoryTransaction);
  }


}
