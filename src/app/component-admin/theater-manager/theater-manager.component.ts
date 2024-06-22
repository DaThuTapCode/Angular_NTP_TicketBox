import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheaterManagerService } from '../../service-admin/theater-manager.service';
import { Theater } from '../../model/theater';
import { map } from 'rxjs';
import { NotificationService } from '../../service/notification.service';
import { TheaterRequest } from '../../request-model/movie/theater-request';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-theater-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './theater-manager.component.html',
  styleUrl: './theater-manager.component.scss'
})
export class TheaterManagerComponent {

  theaters: Theater[] = [];
  page: number = 0;
  size: number = 5;
  totalItems: number = 0;
  selectedCinema: any = null;
  previewUrl: string | ArrayBuffer | null = null;

  theaterNew: TheaterRequest = {
    name: 'Name',
    location: 'Mỹ Đình',
    image: 'hehe',
    phone: '0123456',
    email: 'ntp@123456',
    description: 'Ơ ớ',
    file: null
  }

  selectedTheater: TheaterRequest = {
    name: '',
    location: '',
    image: '',
    phone: '',
    email: '',
    description: '',
    file: null
  };
  onEditSubmit(): void {
    // Update the theater details
    // const index = this.theaters.findIndex(t => t.id === this.selectedTheater.id);
    // if (index > -1) {
    //   this.theaters[index] = { ...this.selectedTheater };
    // }
    // this.modalService.dismissAll();
  }

  constructor(
    private theaterAdminService: TheaterManagerService
    , private noti: NotificationService
  ) { }

  ngOnInit(): void {
    this.getTheaters();
  }

  getTheaters() {
    this.theaterAdminService.getPageTheater(this.page, this.size).pipe(
      map((data: any) => {
        this.totalItems = data.totalItems;
        return data.data.map((theaterData: any) => new Theater(theaterData));
      })
    ).subscribe({
      next: ((resp: Theater[]) => {
        this.theaters = resp;
        console.log(resp);
      }),
      error: (err: any) => {
        this.noti.showError(err.message)
      }
    })
  }



  hehe(event: any) {
    const file = event.target.files[0];
    if (file) {

      const fileSizeInMB = file.size / (1024 * 1024); 

      if (fileSizeInMB > 1) {
        alert('Kích thước file không được lớn hơn 1MB');
        return;
      }


      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(fileType)) {
        this.noti.showError('Chỉ được chọn ảnh (JPEG, PNG, GIF).');
        this.previewUrl = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.theaterNew.file = file;
    }
  }

  updateImageTheater($event: Event) {


  }


  createNewTheater() {
    this.theaterAdminService.postCreateNewTheater(this.theaterNew);
  }


  openAddCinemaModal() {
  }

  editCinema(id: number) {
    this.theaters.forEach(theater => {
      if (theater.id === id) {
        this.selectedTheater.description = theater.description;
        this.selectedTheater.email = theater.email;
        this.selectedTheater.location = theater.location;
        this.selectedTheater.name = theater.name;
        this.selectedTheater.phone = theater.phone;
      }
    });
    console.log(this.selectedTheater);
  }

  deleteCinema(id: number) {
  }



}
