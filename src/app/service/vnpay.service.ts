import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../enviroment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnpayService {

  apiBase = environment.apiUrl;
  apiCreateTransaction = `${this.apiBase}api/v1/payment/create-payment`
  
  listQuantity: number [] = [];

  
  constructor(
    private http: HttpClient
    , private router: Router
  ) { }


  

  getPayment(price: number, id: number): Observable<any> {
    let params = new HttpParams()
      .set('price', price.toString())
      .set('id_booking', id.toString());
    return this.http.get(this.apiCreateTransaction, {
      params
      // responseType: 'text'
    });
  }
  

  // getPaymentService(price: number, id: number): Observable<string>{
  //   let params = new HttpParams()
  //   .set('price', price.toString())
  //   .set('contractId', id.toString())
  // }

  createPayMent(): Observable<any>{
    return  this.http.get<any>(this.apiCreateTransaction);
  }

  // payment(price: number, id: number){
  //   // if(new Date() > new Date(this.sesmester.registrationEndDate)){
  //   //     Swal.fire
  //   // }

  //   this.
  // }

}
