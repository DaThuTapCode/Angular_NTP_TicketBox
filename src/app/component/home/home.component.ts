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
    , private renderer: Renderer2
  ) { }


  ngOnInit(): void {

    // this.notificationService.showSuccess('Chào bạn đến với NTP Ticket box!');
    this.loadScript('assets/home.js');
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
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

  test() {
    this.movieService.getMovieUpcoming();
  }

  buyTicket(movieId: number) {
    alert('a')
    this.router.navigate(['/booking', movieId]);
  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }
}
