import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  urlFacebook: string = 'https://www.facebook.com/nt.phu.5686';
  urlGithub: string = 'https://github.com/DaThuTapCode';
  urlIns: string = 'https://www.instagram.com/nphu_139/';

  urlLogo: string = 'assets/img/_bbac179f-8c31-41c0-92e6-83dd0f318c92.jpg';
  urlLogoFacebook: string = 'assets/img/logo-facebook.png';
  urlLogoGithub: string = 'assets/img/logo-github.png';
  urlLogoIns: string = 'assets/img/logo-ins.png';
}
