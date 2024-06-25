import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { User } from '../../model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../../request-model/user/user-login';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('registerForm') registerForm!: NgForm;
  constructor(
    private renderer: Renderer2
    ,private userService: UserService
    ) { }


  // ngAfterViewInit(): void {
  //   // alert('oo')
  //   this.loadScript('assets/loginjs.js');
  // }
    private script: HTMLScriptElement | null = null;

  ngOnInit(): void {
   this.loadScript('assets/loginjs.js');
  }
  // ngAfterViewInit(): void {
  //   this.loadScript('assets/loginjs.js');
  // }

  ngOnDestroy(): void {
    console.log('destroy')
    this.removeScript();
  }


  removeScript(): void {
    if (this.script) {
      console.log(this.script);
      this.renderer.removeChild(document.body, this.script);
      this.script = null;
    }
  }
  loadScript(src: string): void {
this.removeScript();
    this.script = this.renderer.createElement('script');
    this.script!.src = src;
    this.script!.type = 'text/javascript';
    this.script!.async = true;
    this.script!.defer = true;
    this.renderer.appendChild(document.body, this.script);
  }
  urlWall: string = 'assets/img/wall-login.jpg';
  urlBanner: string = 'assets/img/banner-login.jpg';

  /**Hàm đăng ký tài khoản */
  register() {
    if (this.validateRegister()) {
      this.userService.register(this.userRegister);
    }
  }

  /**Validate input register */
  usernameError: string = '';
  emailError: string = '';
  confirmPasswordError: string = '';
  passwordError: string = '';
  fullnameError: string = '';
  validateRegister(): boolean {
    const regex = /^[a-zA-Z0-9]+$/;

    if (!this.userRegister.username.trim() || this.userRegister.username.trim().length < 3 || this.userRegister.username.length > 100) {
      this.usernameError = 'User name từ 3 - 100 ký tự!';
      return false;
    }

    if (this.userRegister.username.includes(' ')) {
      this.usernameError = 'Username không được chứa dấu cách.';
      return false;
    }

    if (!regex.test(this.userRegister.username)) {
      this.usernameError ='Username không được chứa ký tự đặc biệt.';
      return false;
    }

    this.usernameError = '';
    if (this.userRegister.fullname.length < 3 || this.userRegister.fullname.length > 100) {
      this.fullnameError = 'Full name từ 3 - 100 ký tự!';
      return false;
    }
    this.fullnameError = '';

    if (this.userRegister.email.length < 3 || this.userRegister.email.length > 100) {
      this.emailError = 'Email name từ 3 - 100 ký tự';
      return false;
    }
    this.emailError = '';

    if (this.userRegister.password.length < 6 || this.userRegister.password.length > 200) {
      this.passwordError = 'Password  từ 6 - 200 ký tự!';
      return false;
    }
    this.passwordError = '';

    if (this.userRegister.retypepassword.length < 1) {
      this.confirmPasswordError = 'Nhập mật khẩu xác nhận!';
      return false;
    }

    if (this.userRegister.password != this.userRegister.retypepassword) {
      this.confirmPasswordError = 'Mật khẩu xác nhận không khớp!';
      return false;
    }

    this.confirmPasswordError = '';

    return true;
  }

  /**
   * Hàm đăng nhập
   */
  login() {
    if(this.validateLogin()){
      this.userService.login(this.userLogin);
    }

  }

  /**
   * Check dữ liệu đầu vào login
   */
  usernameLoginError: string = '';
  passwordLoginError: string = '';
  validateLogin(): boolean{
    const regex = /^[a-zA-Z0-9]+$/;
    var usernameValid: string  = this.userLogin.username;
    var passwordValid:string = this.userLogin.password;
    // Kiểm tra rỗng, khoảng cách và độ dài của username
  if (!usernameValid || usernameValid.trim().length === 0) {
    this.usernameLoginError = 'Username không được rỗng.';
    return false;
  }

  if (usernameValid.includes(' ')) {
    this.usernameLoginError = 'Username không được chứa dấu cách.';
    return false;
  }

  if (usernameValid.length < 3 || usernameValid.length > 100) {
    this.usernameLoginError ='Username phải từ 3 - 100 ký tự.';
    return false;
  }

  if (!regex.test(usernameValid)) {
    this.usernameLoginError ='Username không được chứa ký tự đặc biệt.';
    return false;
  }

  if(passwordValid.length < 6 || passwordValid.length > 200){
    this.passwordLoginError = 'Password  từ 6 - 200 ký tự!'
    return false;
  }

  this.usernameLoginError = '';
    return true;
  }




  changeUserName() {
    console.log(`userName: ${this.userRegister.username}`)
  }


   userRegister: User = {
     username: '',
     email: '',
     retypepassword: '',
     fullname: '',
     password: '',
     status: 'ACTIVE',
     googleacountid: 0,
     facebookacountid: 0,
     role: 2,
     image: ''
   };

  userLogin: UserLogin = {
    username: 'phunt',
    password: '130904'
  }




}

