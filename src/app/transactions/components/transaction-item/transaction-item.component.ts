import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() item:any;
  date_string:string;
  outflow:number;
  inflow:number;
  constructor() { }

  ngOnInit(): void {
    this.date_string = this.getFormattedDate(this.item.date);
    this.outflow = this.item.outflow.toFixed(2);
    this.inflow = this.item.inflow.toFixed(2);
    console.log(this.outflow);
    console.log(this.inflow);
  }

  getFormattedDate(date: Date): string {
    let year = date.getFullYear();
  
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }
}
