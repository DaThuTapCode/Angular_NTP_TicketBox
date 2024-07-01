import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheaterManagerService } from '../../service-admin/theater-manager.service';
import { Theater } from '../../model/theater';
import { Observable, map } from 'rxjs';
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

  previewUrlUpdate: string | ArrayBuffer | null = null;

  theaterNew: TheaterRequest = {
    name: 'Name',
    location: 'Mỹ Đình',
    image: 'hehe',
    phone: '0123456',
    email: 'ntp@123456',
    description: 'Mô tả',
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
  saveChanges(): void {
    this.updateTheater();
    const closeModal = document.getElementById('close-modal-update') as HTMLButtonElement;
    if (closeModal) {
      closeModal.click();
    }
  }

  logChange(): void {
    alert('Changes have been logged!');
  }

  updateImageTheater(event: any) {
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
        this.previewUrlUpdate = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.selectedTheater.file = file;
    }

  }


  createNewTheater() {
    var check = confirm('Bạn có chắc muốn thêm rạp mới?');
    if (check) {
      const formData: FormData = new FormData();
      formData.append('name', this.theaterNew.name);
      formData.append('email', this.theaterNew.email);
      formData.append('phone', this.theaterNew.phone);
      formData.append('location', this.theaterNew.location);
      formData.append('description', this.theaterNew.description);
      formData.append('image', this.theaterNew.image);
      if (this.theaterNew.file) {
        formData.append('file', this.theaterNew.file, this.theaterNew.file.name);
      }
      this.theaterAdminService.postCreateNewTheater(formData).subscribe({
        next: ((resp: any) => {
          try {
            this.getTheaters();
            this.noti.showSuccess(resp.message);
          } catch (error) {
            console.error('Error parsing response:', error);
            this.noti.showError(resp.message);
          }
        }),
        error: (error) => {
          console.error('HTTP error:', error);
          this.noti.showError(error.error.message);
        }
      });
    }
  }
  updateTheater() {
    var check = confirm('Bạn có chắc muốn update rạp?');
    if (check) {
      const formData: FormData = new FormData();
      formData.append('name', this.selectedTheater.name);
      formData.append('email', this.selectedTheater.email);
      formData.append('phone', this.selectedTheater.phone);
      formData.append('location', this.selectedTheater.location);
      formData.append('description', this.selectedTheater.description);
      formData.append('image', this.selectedTheater.image);
      if (this.selectedTheater.file) {
        formData.append('file', this.selectedTheater.file, this.selectedTheater.file.name);
      }
      this.theaterAdminService.updateTheater(this.theaterIđUpate,formData).subscribe({
        next: ((resp: any) => {
          try {
            this.getTheaters();
            this.noti.showSuccess(resp.message);
          } catch (error) {
            console.error('Error parsing response:', error);
            this.noti.showError(resp.message);
          }
        }),
        error: (error) => {
          console.error('HTTP error:', error);
          this.noti.showError(error.error.message);
        }
      });
    }
  }

  openAddCinemaModal() {
  }

  theaterIđUpate = 0;

  editCinema(id: number) {
    this.theaters.forEach(theater => {
      if (theater.id === id) {
        this.theaterIđUpate = theater.id;
        this.selectedTheater.description = theater.description;
        this.selectedTheater.email = theater.email;
        this.selectedTheater.location = theater.location;
        this.selectedTheater.name = theater.name;
        this.selectedTheater.phone = theater.phone;
        this.previewUrlUpdate = theater.image;

      }
    });
    console.log(this.selectedTheater);
  }

  deleteCinema(id: number) {
  }



}
