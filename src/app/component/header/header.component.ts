import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionloginService } from '../../service/sessionlogin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  user:any;

  constructor(private sessionLogin: SessionloginService){}
  
  ngOnInit(): void {
    this.sessionLogin.user$.subscribe(user =>{
      this.user = user;
    });
  }


}
