import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageService } from '../../service/message.service';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movies';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { SessionloginService } from '../../service/sessionlogin.service';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class HomeComponent implements OnInit {

  
  logoUrl = 'assets/img/_0af58169-9458-4dfb-a1bc-a3f3a07bf1a1.jpg';
  message: string = '';

  movies: Movie[] = [];

  moviesUpcomings: Movie[] = [];

  movieDetail!: Movie;

  responseData: string = '';

  safeUrl!: SafeResourceUrl;

  modalTrailer = false;

  constructor(
    private router: Router
    , private messageService: MessageService
    , private movieService: MovieService
    , private notificationService: NotificationService
    , private sessionLogin: SessionloginService
    , private sanitizer: DomSanitizer
    , private titleService: Title
  ) { }



  ngOnInit(): void {
    this.loadMovies();
    this.loadMoviesUpComing();
    this.loadMessageCheckHealth();
    this.fetchData(1, 1);
    this.titleService.setTitle('Home | NTP - Cinema');
  }

  closeModalTrailer(): void {
    const closeModal = document.getElementById('close-modal-update') as HTMLButtonElement;
    if (closeModal) {
      closeModal.click();
    }
  }


  handleDivClick(event: Event): void {
    console.log('Div clicked!', event);
    // Xử lý sự kiện click tại đây
    this.modalTrailer = false;
  }

  openModalTrailer() {
    this.modalTrailer = true;
  }

  loadMessageCheckHealth(){
    this.messageService.getMessage().subscribe(resp => {
      this.message = resp;
    });
  }

  loadMovies(){
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      console.log(data)
    });
  }

  loadMoviesUpComing(){
    this.movieService.getMovieUpcoming().subscribe(resp => {
      this.moviesUpcomings = resp;
    });
  }

  /**
   * Lấy chi tiết phim theo id
   */
  fetchData(id: number, status: number): void {
    this.movieService.getDetailMovie(id, status).subscribe(response => {
      this.movieDetail = response;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movieDetail.trailer);

    });
  }

  // test() {
  //   this.movieService.getMovieUpcoming();
  // }

  buyTicket(movieId: number) {
    if (this.sessionLogin.getUser()) {
      this.notificationService.showSuccess('Mời bạn chọn suất chiếu và địa điểm!!');
      this.router.navigate(['/booking', movieId]);
    }else{
      this.notificationService.showWarning('Bạn phải đăng nhập để mua vé!!');
    }

  }
  
}
