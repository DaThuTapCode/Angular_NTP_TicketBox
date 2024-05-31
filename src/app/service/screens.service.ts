import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreensService {

  getScreens(){
    return[
      {
        id: 1, rows: 5, cols:  10
      },
      {
        id: 2, rows: 6, cols:  12
      }
    ]
  }

  constructor() { }
}
