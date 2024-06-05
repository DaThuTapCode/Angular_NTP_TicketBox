import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageService } from '../../service/message.service';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movies';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class HomeComponent implements OnInit {

  message: string = '';

  movies: Movie[] = [];

  moviesUpcoming: Movie[] = [];

  movieDetail!: Movie;

  responseData: string = '';

  constructor(
    private router: Router
    , private messageService: MessageService
    , private movieService: MovieService
    , private notificationService: NotificationService
  ) { }


  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      console.log(data)
    });

    this.movieService.getMovieUpcoming().subscribe(resp => {
      this.moviesUpcoming = resp;
    });

    this.messageService.getMessage().subscribe(resp => {
      this.message = resp;
    });
  }

  /**
   * Lấy chi tiết phim theo id
   */
  fetchData(id: number, status: number): void {
    this.movieService.getDetailMovie(id, status).subscribe(response => {
      this.movieDetail = response;
    });
  }

  // test() {
  //   this.movieService.getMovieUpcoming();
  // }

  buyTicket(movieId: number) {
    this.notificationService.showSuccess('Mời bạn chọn suất chiếu và địa điểm!!');
    this.router.navigate(['/booking', movieId]);
  }
}
