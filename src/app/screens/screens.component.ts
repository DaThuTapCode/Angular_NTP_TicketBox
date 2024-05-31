import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.scss'
})
export class ScreensComponent {
    rows = 5
    cols = 10;

    seats:{row: number, col: number, status: 'available' | 'selected' | 'booked'}[][] = [];

    constructor(){
      for (let i = 0; i < this.rows; i++) {
        this.seats[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.seats[i][j] = { row: i, col: j, status: 'available' };
        }
      }
    }


    toggleSeat(seat: { row: number, col: number, status: string }) {
      if (seat.status === 'available') {
        seat.status = 'selected';
      } else if (seat.status === 'selected') {
        seat.status = 'available';
      }
    }
  
    bookSeats() {
      this.seats.forEach(row => {
        row.forEach(seat => {
          if (seat.status === 'selected') {
            seat.status = 'booked';
          }
        });
      });
    }
}
