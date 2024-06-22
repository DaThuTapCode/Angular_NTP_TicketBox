import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movies';
import { MovieRequest } from '../../request-model/movie/movie-request';
import { MovieService } from '../../service/movie.service';
import { FormsModule } from '@angular/forms';
import { MovieManagerService } from '../../service-admin/movie-manager.service';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-movie-manager',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-manager.component.html',
  styleUrl: './movie-manager.component.scss'
})
export class MovieManagerComponent implements OnInit {

  constructor(
    private movieAdminService: MovieManagerService
    , private noti: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllMovie();
  }

  movies: Movie[] = [];
  currentPage: number = 0;
  pageSize: number = 3;
  totalItems: number = 0;

  /**Lấy ra toàn bộ phim */
  /** Lấy ra toàn bộ phim */
  getAllMovie() {
    this.movieAdminService.getAllMovies(this.currentPage, this.pageSize).pipe(
      map((data: any) => {
        // Trích xuất totalItems từ dữ liệu trả về
        this.totalItems = data.totalItems;
        console.log(data)
        // Chuyển đổi dữ liệu phim thành các đối tượng Movie
        return data.data.map((movieData: any) => new Movie(movieData));
      })
    )
      .subscribe({
        next: (resp: Movie[]) => {
          // Gán dữ liệu phim vào mảng movies
          this.movies = resp;
          console.log(resp);
        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      });
  }



  previewUrl: string | ArrayBuffer | null = null;
  previewUr2: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;



  /**Tạo phim mới */
  createNewMovie() {
    this.movieAdminService.createNewMovie(this.movieNew);
    this.getAllMovie();
    this.totalPages;
  }

  hehe(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(fileType)) {
        this.noti.showError('Chỉ được chọn ảnh (JPEG, PNG, GIF).');
        this.previewUrl = null;
        return;
      }

      this.errorMessage = null;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.movieNew.file = file;
    }
  }
  hehe2(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(fileType)) {
        this.noti.showError('Chỉ được chọn ảnh (JPEG, PNG, GIF).');
        this.previewUr2 = null;
        return;
      }

      this.errorMessage = null;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUr2 = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.movieUpdate.file = file;
    }
  }

  movieNew: MovieRequest = {
    title: 'Transformer One',
    descriptions: 'Người máy biến hình 1',
    duration: 180,
    releasedate: '',
    genre: 'Viễn Tưởng',
    language: 'Phụ đề',
    performers: 'Trọng Phú ọp tì mớt',
    director: 'Trọng Phú',
    trailer: 'Trai lơ',
    status: 1,
    file: null
  };

  movieUpdate!: MovieRequest;

  idmovieupdate: number = 0;
  loadDetailMovie(movie: Movie) {
    this.movieUpdate = {
      title: movie.title,
      descriptions: movie.description,
      duration: movie.duration,
      releasedate: movie.releaseDate + ``,
      genre: movie.genre,
      language: movie.language,
      performers: movie.performers,
      director: movie.director,
      trailer: movie.trailer,
      status: movie.status,
      file: null
    };
    this.idmovieupdate = movie.id;
  }
  updateMovie(){
    const formData = new FormData();
    formData.append('title', this.movieUpdate.title);
    formData.append('descriptions', this.movieUpdate.descriptions);
    formData.append('duration', this.movieUpdate.duration.toString());
    formData.append('releasedate', this.movieUpdate.releasedate);
    formData.append('genre', this.movieUpdate.genre);
    formData.append('language', this.movieUpdate.language);
    formData.append('performers', this.movieUpdate.performers);
    formData.append('director', this.movieUpdate.director);
    formData.append('trailer', this.movieUpdate.trailer);
    formData.append('status', this.movieUpdate.status.toString());
    console.log(this.movieUpdate.releasedate)
    if (this.movieUpdate.file) {
      formData.append('file', this.movieUpdate.file, this.movieUpdate.file.name);
    }
    this.movieAdminService.updateMovie(formData, this.idmovieupdate)
      .subscribe({
        next: (resp: any) => {
          this.noti.showSuccess(resp.message);
          this.getAllMovie();
        }
        ,
        error: (err) => {
          console.error('HTTP error:', err);
          this.noti.showError(err.error.message)
        }
      });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getAllMovie();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

}
