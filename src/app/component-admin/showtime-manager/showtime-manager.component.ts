import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowTime } from '../../model/showtime';
import { Theater } from '../../model/theater';
import { TheaterManagerService } from '../../service-admin/theater-manager.service';
import { NotificationService } from '../../service/notification.service';
import { ScreenManagerService } from '../../service-admin/screen-manager.service';
import { Screen } from '../../model/screen';
import { MovieManagerService } from '../../service-admin/movie-manager.service';
import { Movie } from '../../model/movies';
import { ShowtimeManagerService } from '../../service-admin/showtime-manager.service';
import moment from 'moment';

@Component({
  selector: 'app-showtime-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './showtime-manager.component.html',
  styleUrls: ['./showtime-manager.component.scss']
})
export class ShowtimeManagerComponent implements OnInit {

  theaterList: Theater[] = [];
  theaterIsSelected!: Theater | null;
  selectedTheaterId: number | null = null;

  screenList: Screen[] = [];
  screenIsSelected!: Screen | null;

  movieEnableList: Movie[] = [];
  movieIsSelected!: Movie | null;

  showtimeNew: ShowTime = {
    id: null,
    movie: this.movieIsSelected,
    screen: this.screenIsSelected,
    showdate: '',
    showtime: '11:59'
  };

  showTimeList: ShowTime[] = [];

  ngOnInit(): void {
    this.loadAllTheater();
    this.loadAllMovieEnable();
  }

  constructor(
    private theaterAdminService: TheaterManagerService,
    private noti: NotificationService,
    private screensAdminService: ScreenManagerService,
    private movieAdminService: MovieManagerService,
    private showtimeAdminService: ShowtimeManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createNewShowTime() {
    this.showtimeNew.movie = this.movieIsSelected;
    this.showtimeNew.screen = this.screenIsSelected;
    this.showtimeAdminService.postCreateShowTime(this.showtimeNew).subscribe({
      next: ((resp: any) => {
        this.noti.showSuccess(resp.message);
        if (this.theaterIsSelected?.id && this.showtimeNew.screen?.id) {
          this.loadShowTimeByTheaterScreenShowDate(this.theaterIsSelected?.id, this.showtimeNew.screen?.id, this.showtimeNew.showdate);
        }
      }),
      error: (err: any) => {
        console.log(err);
        this.noti.showError(err.error.message)
      }
    });
  }

  isPastShowtime(showdate: string, showtime: string): boolean {
    const showDateTime = moment(`${showdate} ${showtime}`, 'YYYY-MM-DD HH:mm');
    console.log(showDateTime)
    return moment().isAfter(showDateTime);
  }

  loadScreensByTheater(theaterId: number) {
    if (theaterId) {
      this.screensAdminService.getAllScreensByTheater(theaterId).subscribe({
        next: (value: any) => {
          this.screenList = value.data;
        }
      });
    } else {
      this.screenList = [];
    }
  }

  loadShowTimeByTheaterScreenShowDate(theaterId: number, screenId: number, showDate: string) {
    this.showtimeAdminService.getShowTimeByTheaterIdScreenIdShowDate(theaterId, screenId, showDate).subscribe({
      next: ((value: any) => {
        this.showTimeList = value.data;
        console.log(value.data);
      })
    });
  }

  loadAllTheater() {
    this.theaterAdminService.getAllTheater().subscribe({
      next: ((value: any) => {
        this.theaterList = value.data;
      }),
      error: ((err: any) => {
        this.noti.showError(err);
        console.error('Có lỗi khi lấy danh sách rạp:', err);
      })
    });
  }

  loadAllMovieEnable() {
    this.movieAdminService.getAllMovieEnable().subscribe({
      next: ((value: any) => {
        this.movieEnableList = value.data;
        console.log(value.data);
      }),
      error: ((err: any) => {
        this.noti.showError(err);
      })
    });
  }

  allConditionsMet(): boolean {
    return this.theaterIsSelected && this.movieIsSelected && this.screenIsSelected && this.showtimeNew.showdate ? true : false;
  }

  onTheaterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTheater = this.theaterList[selectElement.selectedIndex - 1];
    console.log(selectedTheater);

    if (selectedTheater && selectedTheater.id) {
      this.theaterIsSelected = selectedTheater;
      this.loadScreensByTheater(selectedTheater.id);
      this.updateUrl();
      if (this.theaterIsSelected && this.screenIsSelected && this.showtimeNew.showdate) {
        this.loadShowTimeByTheaterScreenShowDate(this.theaterIsSelected.id, this.screenIsSelected.id, this.showtimeNew.showdate);
      }
    } else {
      this.showTimeList = [];
      this.screenList = [];
      this.theaterIsSelected = null;
      this.screenIsSelected = null;
      this.movieIsSelected = null;
      console.warn('Rạp chiếu không hợp lệ!');
      this.updateUrl();
    }
  }

  deleteShowtime(){
    var check = confirm('Bạn có muốn xóa suất chiếu?')
    if(check){
      console.log('delete')
    }
  }

  onScreenChange(event: Event): void {
    const selectedElement = event.target as HTMLSelectElement;
    const selectedScreen = this.screenList[selectedElement.selectedIndex - 1];
    console.log(selectedScreen);

    if (selectedScreen && selectedScreen.id) {
      this.screenIsSelected = selectedScreen;
      this.updateUrl();
      if (this.theaterIsSelected && this.screenIsSelected && this.showtimeNew.showdate) {
        this.loadShowTimeByTheaterScreenShowDate(this.theaterIsSelected.id, this.screenIsSelected.id, this.showtimeNew.showdate);
      }
    } else {
      this.showTimeList = [];
      this.screenIsSelected = null;
      this.updateUrl();
    }
  }

  onMovieChange(event: Event): void {
    const selectedElement = event.target as HTMLSelectElement;
    const selectedMovie = this.movieEnableList[selectedElement.selectedIndex - 1];
    console.log(selectedMovie);

    if (selectedMovie && selectedMovie.id) {
      this.movieIsSelected = selectedMovie;
      this.updateUrl();
      if (this.theaterIsSelected && this.screenIsSelected && this.showtimeNew.showdate) {
        this.loadShowTimeByTheaterScreenShowDate(this.theaterIsSelected.id, this.screenIsSelected.id, this.showtimeNew.showdate);
      }
    } else {
      this.movieIsSelected = null;
      this.updateUrl();
    }
  }

  onDateChange(event: Event) {
    const selectedElement = event.target as HTMLInputElement;
    this.showtimeNew.showdate = selectedElement.value;
    console.log('Ngày chiếu:', selectedElement.value);

    if (this.theaterIsSelected && this.screenIsSelected && this.showtimeNew.showdate) {
      this.loadShowTimeByTheaterScreenShowDate(this.theaterIsSelected.id, this.screenIsSelected.id, this.showtimeNew.showdate);
    }
    this.updateUrl();
  }

  updateUrl(): void {
    const queryParams: any = {};

    if (this.theaterIsSelected) {
      queryParams.theater = this.theaterIsSelected.id;
    }
    if (this.screenIsSelected) {
      queryParams.screen = this.screenIsSelected.id;
    }
    if (this.movieIsSelected) {
      queryParams.movie = this.movieIsSelected.id;
    }
    if (this.showtimeNew.showdate) {
      queryParams.showdate = this.showtimeNew.showdate;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
