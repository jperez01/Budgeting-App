import { Component, OnInit } from '@angular/core';
import DateInfo from '../../../shared/date/dateInfo';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  blankspacesfront:number;
  blankspacesback:number;
  info:DateInfo;
  month_string:string;
  current_month:string;
  current_year:number;
  weekday:number;
  days_in_month:number;
  filtered_trans:any[];
  has_transactions:boolean[];
  blankfront;
  blankback;
  monthdays;

  constructor(private infoService: BudgetingInfoService) {
    this.blankspacesfront = 0;
    this.blankspacesback = 0;
    this.info = new DateInfo();
  }

  ngOnInit(): void {
    this.current_year = this.info.getYear();
    this.current_month = this.info.getMonthAsString();
    this.days_in_month = this.info.findDaysInMonth();
    this.findBlankSpacesInitial();
    this.filterTransactions();
    this.blankback = Array(this.blankspacesback).fill(null).map((x,i) => i);
    this.blankfront = Array(this.blankspacesfront).fill(null).map((x,i) => i);
    this.monthdays = Array(this.days_in_month).fill(null).map((x,i) => i + 1);
  }

  findBlankSpacesInitial(): void {
    let first_occur = this.info.getCurrentDay() % 7;
    if (first_occur > this.info.getWeekday()) {
      let offset_value = first_occur - (this.info.getWeekday() + 1);
      this.blankspacesfront = 7 - offset_value;
    } else {
      this.blankspacesfront = Math.abs(first_occur - this.info.getWeekday()) + 1;
    }
    if (this.blankspacesfront + this.days_in_month > 35) {
      this.blankspacesback = 42 - (this.blankspacesfront + this.days_in_month);
    } else {
      this.blankspacesback = 35 - (this.blankspacesfront + this.days_in_month);
    }
  }

  filterTransactions(): void {
    this.has_transactions = [];
    this.filtered_trans = [];
    let transactions = this.infoService.getTransactions();
    let min_date = new Date(this.info.getYear(), this.info.getMonth(), 1);
    let max_date = new Date(this.info.getYear(), this.info.getMonth(), this.info.getEndDay());
    transactions.forEach(transaction => {
      if (this.info.inRange(transaction.date, min_date, max_date)) {
        this.filtered_trans.push(transaction);
      }
    });
    this.filtered_trans.forEach(transaction => {
      this.has_transactions[transaction.date.getDate() - 1] = true;
    });
    for (let i = 0; i < this.info.findDaysInMonth(); i++) {
      if (this.has_transactions[i] === undefined) {
        this.has_transactions[i] = false;
      }
    }
  }
}
