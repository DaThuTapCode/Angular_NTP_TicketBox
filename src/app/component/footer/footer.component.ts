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

}
