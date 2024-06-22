import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../component/header/header.component";
import { FooterComponent } from "../component/footer/footer.component";

@Component({
    selector: 'app-notfound',
    standalone: true,
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.scss',
    imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class NotfoundComponent {
  message = '404 NOT FOUND LINK'
  logoUrl = 'assets/img/logo-brand-ntp-4.jpg';
}
