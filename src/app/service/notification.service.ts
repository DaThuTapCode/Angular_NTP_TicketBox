import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<{ type: string; message: string }>();
  public notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.notificationSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.notificationSubject.next({ type: 'error', message });
  }
  constructor() { }
}
