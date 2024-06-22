import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../service/theater.service';
import { Theater } from '../../model/theater';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { error } from 'jquery';

@Component({
  selector: 'app-theater',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theater.component.html',
  styleUrl: './theater.component.scss'
})
export class TheaterComponent implements OnInit {
  fetchData(arg0: number) {
    throw new Error('Method not implemented.');
  }
  theaters: Theater[] = [];

  constructor(private theaterService: TheaterService, private noti: NotificationService) { }
  ngOnInit(): void {
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
