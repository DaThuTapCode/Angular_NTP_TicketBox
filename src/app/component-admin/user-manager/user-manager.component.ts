import { Component, OnInit } from '@angular/core';
import { UserManagerService } from '../../service-admin/user-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user';
import { error } from 'jquery';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent implements OnInit{

  userDetail: any = {
    username: '',
    fullname: '',
    email: '',
    role: {
      name: ''
    }
  };

  userList: any[] =[];


  constructor(
    private userAdminService: UserManagerService
    , private noti: NotificationService
  ){}
  ngOnInit(): void {
   this.loadPageUser();
  }

  loadPageUser(){
    this.userAdminService.getPageUser().subscribe({
      next: (value: any) => {
        this.userList = value.data;
      },error: (error: any) => {
        this.noti.showError(error.error.message);
      }
    })
  }

  loadDetail(username: string){
    this.userList.forEach(user => {
      if(user.username === username){
        this.userDetail = user;
        console.log(user.role.name);
      }
    })
  }
}
