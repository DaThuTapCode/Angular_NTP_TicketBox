import { Component, OnInit } from '@angular/core';
import { SessionloginService } from '../../service/sessionlogin.service';
import { User } from '../../model/user';
import { StatisticalService } from '../../service-admin/statistical.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Theater } from '../../model/theater';
import { TheaterManagerService } from '../../service-admin/theater-manager.service';
import { map } from 'rxjs';
import { environment } from '../../enviroment/environment';
import { Booking } from '../../model/booking';

@Component({
  selector: 'app-dashboar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboar.component.html',
  styleUrl: './dashboar.component.scss'
})
export class DashboarComponent implements OnInit {

  apiBase = environment.apiUrl;

  user!: any;

  dailyRevenue = 0;

  weeklyRevenue = 0;

  monthlyRevenue = 0;

  yearlyRevenue = 0;

  dateee = new Date();

  currentDate = this.formatDate(new Date());

  currentMonth = this.dateee.getMonth() + 1;

  currentYear = this.dateee.getFullYear();

  listRevenueMovie: any[] = [];

  theaterList: Theater[] = [];

  bookingList: any[] = [];

  bookingIselected: any;

  //Phân trang
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  changePage(page: number): void {
    this.currentPage = page;
    this.loadBookingList();
  }



  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }


  ngOnInit(): void {
    this.loadDailyRevenue(this.currentDate);
    this.loadMonthlyRevenue();
    this.loadWeeklyRevenue();
    this.loadYearlyRevenue();
    this.loadListTheater();
    this.loadListRevenueMovie();
    this.loadBookingList();
    this.user = this.sessionLogin.getUser();
  }

  constructor(
    private sessionLogin: SessionloginService
    , private statisticalService: StatisticalService
    , private theaterAdminService: TheaterManagerService
  ) { }

  loadData() {
    if (this.theaterIsSelected) {
      this.loadDailyRevenue(this.currentDate);
      this.loadMonthlyRevenue();
      this.loadWeeklyRevenue();
      this.loadYearlyRevenue();
      this.loadListTheater();
      this.loadBookingList();

    }
  }

  avgRevenueShowtime(revenue: number, totalShowtime: number): number {
    if (totalShowtime != 0) {
      return revenue / totalShowtime;
    }
    return 0;
  }

  loadListRevenueMovie() {
    this.statisticalService.getRevenueMovie('').subscribe({
      next: (value: any) => {
        this.listRevenueMovie = value.data;
        this.listRevenueMovie.forEach(rm => {
          rm.image = `${this.apiBase}api/v1/movies/images/${rm.image}`;
        })
        console.log(value.data);
      }
    })
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  loadListTheater() {
    this.theaterAdminService.getAllTheater().subscribe({
      next: (value: any) => {
        this.theaterList = value.data;
      }
    })
  }
  //  map(resp => resp.data.map((movieUpcoming: any) => new Movie(movieUpcoming)))
  loadDailyRevenue(currentDate: string) {
    if (this.theaterIsSelected) {
      this.statisticalService.getDailyRevenueByTheater(currentDate, this.theaterIsSelected.id).subscribe({
        next: (value: any) => {
          this.dailyRevenue = value.data == null ? 0 : value.data;
          console.log(value);
        }
      })
    } else {
      this.statisticalService.getDailyRevenue(currentDate).subscribe({
        next: (value: any) => {
          this.dailyRevenue = value.data == null ? 0 : value.data;
          console.log(value);
        }
      })
    }

  }
  onChangeDay(event: any) {
    this.loadDailyRevenue(this.currentDate);
  }

  loadWeeklyRevenue() {
    this.statisticalService.getWRevenue().subscribe({
      next: (value: any) => {
        this.weeklyRevenue = value.data == null ? 0 : value.data;
        console.log(value);
      }
    })
  }

  loadMonthlyRevenue() {
    if (this.theaterIsSelected) {
      this.statisticalService.getMRevenueByTheater(this.theaterIsSelected.id).subscribe({
        next: (value: any) => {
          this.monthlyRevenue = value.data == null ? 0 : value.data;
          console.log(value);
        }
      })
    } else {
      this.statisticalService.getMRevenue().subscribe({
        next: (value: any) => {
          this.monthlyRevenue = value.data == null ? 0 : value.data;
          console.log(value);
        }
      })
    }

  }

  loadYearlyRevenue() {
    if (this.theaterIsSelected) {
      this.statisticalService.getYRevenueByTheater(this.theaterIsSelected.id).subscribe({
        next: (value: any) => {
          this.yearlyRevenue = value.data == null ? 0 : value.data;
          console.log(value);
        }
      })
    } else {
      this.statisticalService.getYRevenue().subscribe({
        next: (value: any) => {
          this.yearlyRevenue = value.data == null ? 0 : value.data;
          console.log(value);
        }
      })
    }

  }

  loadBookingList() {
    if (this.theaterIsSelected) {
      this.statisticalService.getPageBookingByTheaterId(this.currentPage, this.pageSize, this.theaterIsSelected.id).subscribe({
        next: (value: any) => {
          this.bookingList = value.data;
          console.log(value.data);
          this.totalItems = value.totalItems;

        }
      })
    } else {
      this.statisticalService.getPageBookingAll(this.currentPage, this.pageSize).subscribe({
        next: (value: any) => {
          this.bookingList = value.data;
          console.log(value.data);
          this.totalItems = value.totalItems;
          console.log(this.totalItems);
        }
      })
    }
  }


  loadBookingIsSelected(bookingid: number){
    this.bookingList.forEach(b => {
      if(b.id === bookingid){
        this.bookingIselected = b;
      }
    });
  }

  theaterIsSelected: any;

  onChangeTheater(event: any) {
    const elementSelected = event.target.selectedIndex;
    if (elementSelected > 0) {
      this.theaterIsSelected = this.theaterList[elementSelected - 1];
      console.log(this.theaterIsSelected);
    } else {
      this.theaterIsSelected = null;
      console.log(this.theaterIsSelected);
    }
    this.loadDailyRevenue(this.currentDate);
    this.loadMonthlyRevenue();
    this.loadYearlyRevenue();
    this.loadBookingList();
  }
}
