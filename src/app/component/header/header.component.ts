import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionloginService } from '../../service/sessionlogin.service';
import { TokenService } from '../../service/token.service';
import { NotificationService } from '../../service/notification.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: any;
  logoUrlHeader!: string;

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
