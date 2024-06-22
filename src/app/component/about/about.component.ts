import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  constructor(     private titleService: Title
  ){
    this.titleService.setTitle('About | NTP - Cinema');
  }

  logoUrl = 'assets/img/logo-brand-ntp-4.jpg'
}
