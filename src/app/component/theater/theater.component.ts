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

  // test() {
  //   this.theaterService.getAllTheater().subscribe(
  //     (data: any) => {
  //       this.theaters = data.data
  //       console.log(this.theaters);
  //     },
  //     error => {
  //       this.noti.showError('Lỗi rồi Phú ơi!!' + error.message);
  //     }
  //   );
  // }

  // getAllMovie() {
  //   this.movieAdminService.getAllMovies(this.currentPage, this.pageSize).pipe(
  //     map((data: any) => {
  //       // Trích xuất totalItems từ dữ liệu trả về
  //       this.totalItems = data.totalItems;
  //       console.log(data)
  //       // Chuyển đổi dữ liệu phim thành các đối tượng Movie
  //       return data.data.map((movieData: any) => new Movie(movieData));
  //     })
  //   )
  //     .subscribe({
  //       next: (resp: Movie[]) => {
  //         // Gán dữ liệu phim vào mảng movies
  //         this.movies = resp;
  //         console.log(resp);
  //       },
  //       error: (error: any) => {
  //         console.error('Error:', error);
  //       }
  //     });
  // }

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
