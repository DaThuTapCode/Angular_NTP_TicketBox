import { Component } from '@angular/core';
import { Movie } from '../../model/movies';
import { MovieRequest } from '../../request-model/movie/movie-request';
import { MovieService } from '../../service/movie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-manager',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movie-manager.component.html',
  styleUrl: './movie-manager.component.scss'
})
export class MovieManagerComponent {


createNewMovie() {
this.movieService.createNewMovie(this.movieNew)
}
  hehe(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.movieNew.file = file;
    }
  }
  

  movieNew: MovieRequest = {
    title: 'Transformer One',
    descriptions: 'Người máy biến hình 1',
    duration: 180,
    releasedate: '29/05/2024',
    genre: 'Viễn Tưởng',
    language: 'Phụ đề',
    performers: 'Trọng Phú ọp tì mớt',
    director: 'Trọng Phú',
    trailer: 'Trai lơ',
    status: 1,
    file: null
  };
  


   

constructor(private movieService:MovieService){}



}
