import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";
import { ChangePasswordDTO } from '../../request-model/user/change-password-dto';
import { UserService } from '../../service/user.service';
import { NotificationService } from '../../service/notification.service';
import { SessionloginService } from '../../service/sessionlogin.service';
import { error } from 'jquery';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TransactionHistoryComponent]
})
export class ProfileUserComponent {

  userProfileForm!: FormGroup;

  changePasswordForm!: FormGroup;

  userChangePassword: ChangePasswordDTO = {
    currentpassword: '',
    passwordnew: '',
    confirmpassword: ''
  }
  showPassword: { [key: string]: boolean } = {
    passwordCurrent: false,
    passwordNew: false,
    passwordConfirm: false
  };


  userChangeInfo = {
    email: '',
    file: null as File | null,
    fullname: '',
    image: ''
};




  
  user = this.sessionLogin.getUser();

  userImgEmpty = '/assets/img/user-img-null.png'

  constructor(
    private fb: FormBuilder
    , private title: Title
    , private userService: UserService
    , private noti: NotificationService
    , private sessionLogin: SessionloginService
  ) { }

  ngOnInit() {

    
    this.title.setTitle('Profile | NTP - Cinema');
    this.userProfileForm = this.fb.group({
      fullname: [this.user?.fullname, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      file: [ File],
    });

    this.changePasswordForm = this.fb.group({
      passwordCurrent: [this.userChangePassword.currentpassword, [Validators.required]],
      passwordNew: [this.userChangePassword.passwordnew, [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      passwordConfirm: [this.userChangePassword.confirmpassword, [Validators.required, Validators.minLength(6), Validators.maxLength(200)]]
    });
  }

  onSubmitChangePassword() {
    let field3 = this.changePasswordForm.value['passwordConfirm'];
    let field1 = this.changePasswordForm.value['passwordCurrent'];
    let field2 = this.changePasswordForm.value['passwordNew'];
    if (field2 != field3) {
      this.noti.showError('Mật khẩu xác nhận không khớp!');
      return;
    }

    this.userService.changePassword(this.changePasswordForm).subscribe({
      next: (value: any) => {
        console.log(value);
        this.noti.showSuccess(value.message);
      },
      error: (error: any) => {
        this.noti.showError(error.error.message);
      }
    });
  }



  previewUrlUpdate: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
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
        this.previewUrlUpdate = null;
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
      this.userChangeInfo.file = file;
    }

  }
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.userChangeInfo.file = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // togglePasswordVisibility(field: string): void {
  //   this.showPassword[field] = !this.showPassword[field];
  // }


  onSubmit() {
    if (this.userProfileForm.valid) {
      console.log(this.userProfileForm.value);
      this.userService.changeInfo(this.userProfileForm).subscribe({
        next: (value: any) => {
          console.log(value);
        }, error: (error: any) => {
          console.log(error);
          if(error.error.message){
            this.noti.showError(error.error.message);
          }

          if(error.message){
            this.noti.showError(error.message);
          }
        }
      });

    } else {
      console.log('Form không hợp lệ');
    }
  }

}