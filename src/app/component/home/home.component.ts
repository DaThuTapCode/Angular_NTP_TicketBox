import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageService } from '../../service/message.service';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movies';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class HomeComponent implements OnInit{
    message: string = '';
    movies: Movie[] = [];

    movieDetail!: Movie ;
    
    responseData: string ='';

    constructor(private messageService: MessageService, private movieService: MovieService){}

    ngOnInit(): void {
        this.movieService.getMovies().subscribe(data => {
            this.movies = data;
          });
        this.messageService.getMessage().subscribe(
            (data: string) => this.message = data,
            (error) => console.error(error)
        )
    }
    fetchData(id: number, status: number): void {
        this.movieService.getDetailMovie(id, status).subscribe(response => {
          this.movieDetail = response;
        });
      }
      
    
}
