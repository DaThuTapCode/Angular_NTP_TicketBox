import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {

  userProfileForm!: FormGroup;

  user = {
    role: 1,
    fullname: 'NGUYỄN TRỌNG PHÚ',
    username: 'phunt',
    password: '130904',
    facebookacountid: null,
    googleacountid: null,
    retypepassword: '130904',
    email: 'ntpdth2004@gmail.com',
    image: 'path/to/image.jpg',
    createdat: new Date(),
    updateat: new Date(),
    status: 'ACTIVE'
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      role: [this.user.role, Validators.required],
      fullname: [this.user.fullname, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      username: [this.user.username, Validators.required],
      password: [this.user.password, [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      retypepassword: [this.user.retypepassword, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      facebookacountid: [this.user.facebookacountid],
      googleacountid: [this.user.googleacountid],
      image: [this.user.image],
      createdat: [this.user.createdat],
      updateat: [this.user.updateat],
      status: [this.user.status, Validators.required]
    });
  }

  onSubmit() {
    if (this.userProfileForm.valid) {
      console.log(this.userProfileForm.value);
      // Xử lý logic khi form hợp lệ
    } else {
      console.log('Form không hợp lệ');
    }
  }
}