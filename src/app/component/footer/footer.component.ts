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

  urlLogoFooter: string = 'assets/img/logo-brand-ntp-1.jpg';
  urlLogoFooter2: string = 'assets/img/logo-brand-ntp-2.jpg';
  urlLogoFooter3: string = 'assets/img/logo-brand-ntp-3.jpg';
  urlLogoFooter4: string = 'assets/img/logo-brand-ntp-4.jpg';
  urlLogoFacebook: string = 'assets/img/logo-facebook.png';
  urlLogoGithub: string = 'assets/img/logo-github.png';
  urlLogoIns: string = 'assets/img/logo-ins.png';
}
