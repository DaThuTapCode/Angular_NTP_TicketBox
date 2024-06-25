import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-test-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-excel.component.html',
  styleUrl: './test-excel.component.scss'
})
export class TestExcelComponent {

  excelData: any;
  constructor(

  ) {

  }
  readExcel(event: any) {

    let file = event.target.files[0];
    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {
        var workBook = XLSX.read(fileReader.result, { type: 'binary' });
        var sheetNames = workBook.SheetNames;
        this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        console.log(this.excelData);
      }
    }

  }

}
