import { Component, OnInit, Input } from '@angular/core';
import Transaction from '../../models/transaction';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction: Transaction;
  cost:string;
  date:string;
  constructor() { }

  ngOnInit(): void {
    let difference = this.transaction.inflow - this.transaction.outflow;
    this.cost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(difference);
    this.date = this.getFormattedDate(this.transaction.date);
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
