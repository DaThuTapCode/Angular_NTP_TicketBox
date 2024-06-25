import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../request-model/user/user-login';
import { TokenService } from './token.service';
import { HttpUtilService } from './http.util.service';
import { SessionloginService } from './sessionlogin.service';
import { NotificationService } from './notification.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  UserService {
  private apiBase: string = environment.apiUrl;

  private apiRegister: string = `${this.apiBase}api/v1/users/register`;
  
  private apiLogin: string = `${this.apiBase}api/v1/users/login`;

  private apiChangePassword: string = `${this.apiBase}api/v1/users/change-password`;

  private apiChangeInfo: string = `${this.apiBase}api/v1/users/change-info`;


  constructor(
    private http: HttpClient
    ,private router: Router
    ,private tokenService: TokenService
    ,private httpUtilService: HttpUtilService
  ,private sessionLogin:SessionloginService
  ,private notificationService: NotificationService
) { }


  private createHeaders(): HttpHeaders {
     return new HttpHeaders({'Content-Type': 'application/json'})
  }

register(userRegister: User) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  console.log(userRegister);
  this.http.post(this.apiRegister, userRegister, { headers })
    .subscribe({
      next: (response: any) => {
        console.log(response.status);
        if (response && (response.status === 200 || response.status === 201)) {
          alert('Đăng ký thành công');
          this.router.navigate(["/login-or-register"])
        } else {
          alert('Đăng ký thất bại');
        }
      },
      error: (err: any) => {
        console.log(err);
        console.error('Error occurred:', err);
        this.notificationService.showError('Đăng ký thất bại: ' + err.error.message);
      }
    });
}

changePassword(form: FormGroup): Observable<any>{  
  return this.http.put<any>(this.apiChangePassword, form.value);
}
changeInfo(form: FormGroup): Observable<any>{  
  return this.http.put<any>(this.apiChangeInfo, form.value);
}


login(userLogin: UserLogin) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  console.log(userLogin);
  this.http.post(this.apiLogin, userLogin, { headers, responseType: 'json' })
    .subscribe({
      next: (resp: any) => {
        try {
          const token = resp.data.token;
          this.tokenService.setToken(token);
          this.sessionLogin.setUser(resp.data.userDTO);
          console.log(resp.data.userDTO);
          this.notificationService.showSuccess('Đăng nhập thành công!');
          if(resp.data.userDTO.role === 1 || resp.data.userDTO.role === 3){
            this.router.navigate(["/admin/dashboard"])
           return;
          }
           this.router.navigate(["/home"]);
        } catch (error) {
          this.notificationService.showError('Đăng nhập thất bại!');
          console.error('Error parsing response:', error);
        }
      },
      error: (err) => {
        console.error('HTTP error:', err);
        this.notificationService.showError('Đăng nhập thất bại! ' + err.error.message);
      }
    });
}

}
