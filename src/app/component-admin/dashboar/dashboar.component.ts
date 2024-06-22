import { Component, OnInit } from '@angular/core';
import { SessionloginService } from '../../service/sessionlogin.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-dashboar',
  standalone: true,
  imports: [],
  templateUrl: './dashboar.component.html',
  styleUrl: './dashboar.component.scss'
})
export class DashboarComponent implements OnInit{

  user!: any;

  ngOnInit(): void {
    this.user = this.sessionLogin.getUser();
  }

  constructor(
    private sessionLogin: SessionloginService
  ){}
}
