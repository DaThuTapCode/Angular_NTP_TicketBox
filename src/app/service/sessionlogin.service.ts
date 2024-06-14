import { Injectable } from '@angular/core';
import { LoginResponse } from '../response-model/user/LoginResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionloginService {
  private USER_KEY = 'logged-in-user';
  private userSubject = new BehaviorSubject<LoginResponse | null>(this.getUserFromStorage());

  constructor() { }

  user$ = this.userSubject.asObservable();

  setUser(user: LoginResponse) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): LoginResponse | null {
    return this.userSubject.value;
  }

  clearUser() {
    localStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  getUserRole(): 'ADMIN' | 'USER' | 'MODERATOR' | null{
    const user = this.getUser();
    if(user){
        switch(user.role){
          case 1:
            return 'ADMIN';
          case 2:
            return 'USER';
          case 3: 
            return 'MODERATOR'
          default:
            return null;
        }
    }
    return null;
  }

  private getUserFromStorage(): LoginResponse | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
