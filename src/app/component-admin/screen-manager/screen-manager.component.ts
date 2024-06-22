import { Component, OnInit } from '@angular/core';
import { ScreenManagerService } from '../../service-admin/screen-manager.service';
import { TheaterManagerService } from '../../service-admin/theater-manager.service';
import { Theater } from '../../model/theater';
import { Screen } from '../../model/screen';
import { error } from 'jquery';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Seat } from '../../model/seat';
import { TypeSeat } from '../../enum/type-seat';
import { SeatManagerService } from '../../service-admin/seat-manager.service';

@Component({
  selector: 'app-screen-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './screen-manager.component.html',
  styleUrl: './screen-manager.component.scss'
})
export class ScreenManagerComponent implements OnInit {




  theater!: Theater;
  theaterList: Theater[] = [];

  isTypeAddSeat: boolean = true;

  screen!: Screen;
  screenIsSelectd!: Screen;
  screenNew: Screen = {
    id: 0,
    theater: this.theater,
    name: '',
    type: ''
  };



  groupSeatBRow: { [key: string]: any[] } = {};

  seatList: Seat[] = [];
  seat!: Seat;
  seatNew: Seat = {
    id: 0,
    seatrow: '',
    seatnumber: 0,
    type: TypeSeat.VIP,
    status: 'available',
    screenid: 0
  };

  seatIsSelected!: Seat;





  screensList: Screen[] = [];


  constructor(
    private screenAdminService: ScreenManagerService
    , private theaterAdminService: TheaterManagerService
    , private seatAdminService: SeatManagerService
    , private noti: NotificationService
    , private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var id = params['theaterid'];
      this.loadTheater(id);
    });
  }



  loadDetailSeat(seat: any) {
    this.seatList.forEach(seatl => {
      if (seat.id === seatl.id) {
        this.seatIsSelected = seat;
      }
    }
    );
  }

  loadTheater(id: number) {
    this.theaterAdminService.getTheaterById(id).subscribe({
      next: (value: any) => {
        this.theater = value.data;
        console.log(this.theater);
        this.loadAllScreens(id);
      },
      error: (error: any) => {
        this.noti.showError(error.error.message);
      }
    });
  }

  loadSeatList(screenid: number) {
    this.seatAdminService.getSeatByScreenId(screenid).subscribe({
      next: (value: any) => {
        this.seatList = value.data;
        console.log(value.data)
        this.groupSeatBRow = {};
        this.groupSeatByRow(this.seatList);
      },
      error: (error: any) => {
        this.noti.showError(error.error.mesage);
      }
    })
  }



  groupSeatByRow(seats: Seat[]) {
    seats.forEach(seatg => {
      if (!this.groupSeatBRow[seatg.seatrow]) {
        this.groupSeatBRow[seatg.seatrow] = [];
      }
      this.groupSeatBRow[seatg.seatrow].push(seatg);

    });
  }

  loadAllScreens(id: number) {
    this.screenAdminService.getAllScreensByTheater(id).subscribe({
      next: (value: any) => {
        this.screensList = value.data;
      }, error: (error: any) => {
        this.noti.showError(error.error.mesage);
      }
    });
  }



  onChangeScreens($event: Event) {
    const selectElement = $event.target as HTMLSelectElement;
    const selectedScreen = this.screensList[selectElement.selectedIndex - 1];
    this.screenIsSelectd = selectedScreen;
    if (selectedScreen) {
      this.screenIsSelectd = selectedScreen;
      this.loadSeatList(selectedScreen.id);
    }

  }


  onchangeRadioSeatType($event: Event) {
    const selectElement = $event.target as HTMLSelectElement;
    const typeSeat = selectElement.value;
    if (typeSeat) {
      this.seatAdminService.updateTypeSeat(this.seatIsSelected.id, typeSeat).subscribe({
        next: (value: any) => {
          this.loadSeatList(this.screenIsSelectd.id);
          this.noti.showSuccess(value.message);
        }, error: (error: any) => {
          this.noti.showError(error.error.message);
        }
      });
    }

  }

  createScreen() {
    this.screenNew.theater = this.theater;
    this.screenAdminService.createScreen(this.screenNew).subscribe({
      next: (value: any) => {
        this.loadAllScreens(this.theater.id);
      }, error: (error: any) => {
        this.noti.showError(error.error.message);
      }
    })
  }

  createSeat() {
    if (this.isTypeAddSeat) {
      console.log(this.seatNew);
      if (this.seatNew.seatnumber <= 0) {
        this.noti.showError("Số ghế phải lớn hơn 0!");
        return;
      }
      this.seatNew.screenid = this.screenIsSelectd.id;
      this.seatAdminService.createSingleSeat(this.seatNew).subscribe({
        next: (value: any) => {
          this.loadSeatList(this.screenIsSelectd.id);
        },
        error: (error: any) => {
          this.noti.showError(error.error.message);
        }
      });
    } else {
    }
  }



  deleteSeat(seatid: number) {
    let check: boolean = confirm('Bạn có muốn xóa ghế này?');
    if (check) {
      this.seatAdminService.deleteStatusSeat(seatid).subscribe({
        next: (value: any) => {
          this.noti.showSuccess(value.message);
          this.loadSeatList(this.screenIsSelectd.id);
        },
        error: (error: any) => {
          console.log(error)
          this.noti.showError(error.message);
          // this.noti.showError('Ghế này đã phát sinh hóa đơn không thể xóa');
        }
      });
    }
  }


}
