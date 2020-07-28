import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';
@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {
  @Input() day:number;
  @Input() filtered_trans:any[];
  @Input() info:any;
  @Output() sendTransUp: EventEmitter<any> = new EventEmitter<any>();
  usable_trans:any[];
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.checkTransactions(this.day);
    this.infoService.filtered_transactions.subscribe(transactions => {
      this.filtered_trans = transactions;
      this.checkTransactions(this.day);
    })
  }

  checkTransactions(num:number): void {
    let trans = [];
    let date = new Date(this.info.getYear(), this.info.getMonth(), num);
    let index = 0;
    this.filtered_trans.forEach(transaction => {
      if (date.getTime() === new Date(transaction.date).getTime()) {
        trans.push(transaction);
      }
      index++;
    });
    this.usable_trans = trans;
  }

  sendTransactionUp(transaction:any):void {
    this.sendTransUp.emit(transaction);
  }
}
