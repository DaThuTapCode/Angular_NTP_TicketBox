import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionHistoryService } from '../../service/transaction-history.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent implements OnInit {

  constructor(
    private transactionHistoryService: TransactionHistoryService
    ,private noti: NotificationService

  ) { }

  ngOnInit(): void {
    this.getHistoryTransaction();
  }


  getHistoryTransaction() {
    this.transactionHistoryService.getTransactionHistory().subscribe({
      next: ((resp: any) => {
        console.log(resp.data);
      
        // Xóa danh sách cũ trước khi thêm danh sách mới
        this.bookingList = [];
  
        // Lặp qua mỗi phần tử trong mảng resp.data
        resp.data.forEach((item: any) => {
          // Gán các giá trị từ item vào đối tượng booking
          const booking = {
            id: item.id,
            user: {
              username: item.user.username
            },
            bookingDate: item.bookingdate,
            totalPrice: item.totalPrice,
            status: item.status,
            bookingdetail: item.bookingdetail
          };
  
          // Thêm đối tượng booking vào mảng bookingList
          this.bookingList.push(booking);
        });
  
        console.log(this.bookingList); // Kiểm tra danh sách đặt chỗ
      }),
      error: (err: any) =>{
        this.noti.showError(err.message);
      }
    })
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
    bookingdetail: [] = []
  };


}
