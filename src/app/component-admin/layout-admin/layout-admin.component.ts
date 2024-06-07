import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss'
})
export class LayoutAdminComponent {

}
