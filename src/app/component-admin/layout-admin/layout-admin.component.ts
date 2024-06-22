import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from "../../notification/notification.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-layout-admin',
    standalone: true,
    templateUrl: './layout-admin.component.html',
    styleUrl: './layout-admin.component.scss',
    imports: [CommonModule, RouterModule, NotificationComponent, FooterComponent, HeaderComponent]
})
export class LayoutAdminComponent {
    urlFacebook: string = 'https://www.facebook.com/nt.phu.5686';
    urlGithub: string = 'https://github.com/DaThuTapCode';
    urlIns: string = 'https://www.instagram.com/nphu_139/';
  
    urlLogo: string = 'assets/img/_bbac179f-8c31-41c0-92e6-83dd0f318c92.jpg';
    urlLogoFacebook: string = 'assets/img/logo-facebook.png';
    urlLogoGithub: string = 'assets/img/logo-github.png';
    urlLogoIns: string = 'assets/img/logo-ins.png';
}
