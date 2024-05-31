import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../service/theater.service';
import { Theater } from '../../model/theater';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';

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
    this.theaterService.getAllTheater().subscribe(
      (data: any) => {
        this.theaters = data.data
        console.log(this.theaters);
      },
      error => {
        this.noti.showError('Lỗi rồi Phú ơi!!' + error.message);
      }
    );
  }
}
