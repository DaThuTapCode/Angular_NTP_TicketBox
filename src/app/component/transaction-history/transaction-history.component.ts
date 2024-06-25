import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionHistoryService } from '../../service/transaction-history.service';
import { NotificationService } from '../../service/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
  providers: [DatePipe]
})
export class TransactionHistoryComponent implements OnInit {

  constructor(
    private transactionHistoryService: TransactionHistoryService
    , private noti: NotificationService
    , private datePipe: DatePipe
    , private title: Title

  ) { }

  ngOnInit(): void {
    this.title.setTitle('TransacHistory | NTP - Cinema');
    this.getHistoryTransaction();
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'HH:mm:ss dd-MM-yyyy') || '';
  }


  getHistoryTransaction() {
    this.transactionHistoryService.getTransactionHistory().subscribe({
      next: ((resp: any) => {
        this.bookingList = [];
        resp.data.forEach((item: any) => {
          const booking = {
            id: item.id,
            user: {
              username: item.user.username
            },
            bookingDate: item.bookingdate,
            totalPrice: item.totalPrice,
            status: item.status,
            bookingdetail: item.bookingdetail,
            transactioncode: item.transactioncode,
            orderinfo: item.orderinfo
          };
          this.bookingList.push(booking);
        });
     }),
      error: (err: any) => {
        this.noti.showError(err.message);
      }
    })
  }


  bookingDetailByBookingIdList: any[] = []
  bookingDetailByBookingId(bookingId: number) {
    this.bookingList.forEach(booking => {
      if (booking.id === bookingId) {
        this.bookingDetailByBookingIdList = [];
        this.bookingDetailByBookingIdList = booking.bookingdetail;
      }
    });
  }


  bookingList: any[] = [];


  booking = {
    id: '',
    user: {
      username: ''
    },
    bookingDate: new Date(),
    totalPrice: 0,
    status: '',
    bookingdetail: [] = [],
    transactioncode: '',
    orderinfo: ''
  };


}
