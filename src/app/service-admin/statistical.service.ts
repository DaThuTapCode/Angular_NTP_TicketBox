import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  apiBase = environment.apiUrl;

  apiGetDailyRevenue = `${this.apiBase}api/v1/admin/statistical/daily-revenue`;
  apiGetWeeklyRevenue = `${this.apiBase}api/v1/admin/statistical/weekly-revenue`;
  apiGetMonthlyRevenue = `${this.apiBase}api/v1/admin/statistical/monthly-revenue`;
  apiGetYearlyRevenue = `${this.apiBase}api/v1/admin/statistical/yearly-revenue`;


  getDailyRevenue(currentDate: string): Observable<any>{
    return this.http.get<any>(`${this.apiGetDailyRevenue}/${currentDate}`);
  }

  getDailyRevenueByTheater(currentDate: string, theaterId: number): Observable<any>{
      return this.http.get<any>(`${this.apiGetDailyRevenue}/${currentDate}?theaterId=${theaterId}`);
  }
  getWRevenue(): Observable<any>{
    return this.http.get<any>(this.apiGetWeeklyRevenue);
  }
  getMRevenue(): Observable<any>{
    return this.http.get<any>(this.apiGetMonthlyRevenue);
  }
  getYRevenue(): Observable<any>{
    return this.http.get<any>(this.apiGetYearlyRevenue);
  }

  getMRevenueByTheater(theaterId: number): Observable<any>{
    return this.http.get<any>(`${this.apiGetMonthlyRevenue}?theaterId=${theaterId}`);
  
  }
  getYRevenueByTheater(theaterId: number): Observable<any>{
    return this.http.get<any>(`${this.apiGetYearlyRevenue}?theaterId=${theaterId}`);
  }


  constructor(
    private http: HttpClient
  ) { }
}
