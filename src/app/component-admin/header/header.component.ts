import { Component } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { SessionloginService } from '../../service/sessionlogin.service';
import { TokenService } from '../../service/token.service';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 
  user: any;
  logoUrlHeader!: string;
  userImgEmpty = '/assets/img/user-img-null.png'

  constructor(
    private sessionLogin: SessionloginService
    , private tokenService: TokenService
    , private notificationService: NotificationService
    , private router: Router
  ) { }

  logout() {

    let check = confirm('Bạn có muốn logout?');
    if (check) {
      this.user = null;
      this.sessionLogin.clearUser();
      this.tokenService.removeToken();
      this.notificationService.showSuccess('Logout thành công!');
      this.router.navigate(["login-or-register"]);
    }

  }

  ngOnInit(): void {

    this.logoUrlHeader = 'assets/img/logo-brand-ntp-4.jpg';
    this.sessionLogin.user$.subscribe(user => {
      this.user = user;
    });
  }

}
