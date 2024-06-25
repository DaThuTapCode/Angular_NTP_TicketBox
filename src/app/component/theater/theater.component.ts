import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../service/theater.service';
import { Theater } from '../../model/theater';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { error } from 'jquery';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-theater',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theater.component.html',
  styleUrl: './theater.component.scss'
})
export class TheaterComponent implements OnInit {


  theaters: Theater[] = [];
   theaterIsSelected: any;

   fetchData(theaterId: number) {
    this.theaters.forEach(theater => {
      if(theater.id === theaterId){
        this.theaterIsSelected = theater;
      }
    })
  }

  constructor(
    private theaterService: TheaterService
    , private noti: NotificationService
    , private title: Title
  ) { }
  ngOnInit(): void {
    this.title.setTitle("Sys Theater | NTP - Cinema");
    this.test();
  }
  test() {
    this.theaterService.getAllTheater().pipe(
      map((data: any) => {
        return data.data.map((theaterData: any) => new Theater(theaterData));
      }) 
    ).subscribe({
      next: (resp: Theater[]) =>{
        this.theaters = resp;
      },
      error: (error: any) => {
        this.noti.showError(error);
      }
    })
  }
}
