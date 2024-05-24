import { Injectable } from '@angular/core';
import { environment } from '../component/enviroment/environment';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { UserLogin } from '../request-model/user/user-login';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpUtilService } from './http.util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServer: string = environment.apiUrl;
  private apiRegister:string = this.apiServer + 'api/v1/users/register';
  
  private apiLogin:string = this.apiServer + 'api/v1/users/login';
  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private httpUtilService: HttpUtilService) { }

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
        alert('Đăng ký thất bại: ' + err.error.message);
      }
    });
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
          alert('Đăng nhập thành công!');
          this.router.navigate(["/home"])
        } catch (error) {
          console.error('Error parsing response:', error);
          alert('Đăng nhập thất bại');
        }
      },
      error: (err) => {
        console.error('HTTP error:', err);
        alert('Đăng nhập thất bại: ' + err.error.message);
      }
    });
}

}
