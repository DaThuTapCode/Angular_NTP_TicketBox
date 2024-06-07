import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from "../../notification/notification.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-layout-user',
    standalone: true,
    templateUrl: './layout-user.component.html',
    styleUrl: './layout-user.component.scss',
    imports: [CommonModule, RouterModule, NotificationComponent, HeaderComponent, FooterComponent]
})
export class LayoutUserComponent {

}
