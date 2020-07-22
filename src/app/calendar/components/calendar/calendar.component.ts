import { Component, OnInit } from '@angular/core';
import DateInfo from '../../../shared/date/dateInfo';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  filtered_trans:any[];
  filtered_trans_for_chart:any[];
  moreThan5Rows:boolean;
  info:DateInfo;
  current_month:string;
  current_year:number;
  blanks_front:number;
  blanks_back:number;
  days_in_month:number;
  blank_back:any[];
  blank_front:any[];
  month_days:any[];
  currentTrans:any;

  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.info = new DateInfo();
    this.blank_back = [];
    this.blank_front = [];
    this.month_days = [];
    this.currentTrans = null;
    this.current_month = this.info.getMonthAsString();
    this.current_year = this.info.getYear();
    this.days_in_month = this.info.findDaysInMonth();
    this.findBlankSpacesInitial();
    this.fillDateArrays();
    this.filterTransactions();
  }

  fillDateArrays(): void {
    this.blank_back = Array(this.blanks_back).fill(null).map((x,i) => i);
    this.blank_front = Array(this.blanks_front).fill(null).map((x,i) => i);
    this.month_days = Array(this.days_in_month).fill(null).map((x,i) => i + 1);
  }

  findBlankSpacesInitial(): void {
    let first_occur = this.info.getCurrentDay() % 7;
    if (first_occur > this.info.getWeekday()) {
      let offset_value = first_occur - (this.info.getWeekday() + 1);
      this.blanks_front = 7 - offset_value;
    } else {
      this.blanks_front = Math.abs(first_occur - this.info.getWeekday()) + 1;
    }
    if (this.blanks_front + this.days_in_month > 35) {
      this.blanks_back = 42 - (this.blanks_front + this.days_in_month);
      this.moreThan5Rows = true;
    } else {
      this.blanks_back = 35 - (this.blanks_front + this.days_in_month);
      this.moreThan5Rows = false;
    }
  }

  filterTransactions(): void {
    this.filtered_trans = [];
    let transactions = this.infoService.getTransactions();
    let min_date = new Date(this.info.getYear(), this.info.getMonth(), 1);
    let max_date = new Date(this.info.getYear(), this.info.getMonth(), this.info.getEndDay());
    transactions.forEach(transaction => {
      if (this.info.inRange(new Date(transaction.date), min_date, max_date)) {
        this.filtered_trans.push(transaction);
      }
    });
    this.filtered_trans_for_chart = this.filtered_trans.slice();
    this.infoService.emitFilteredTrans(this.filtered_trans);
  }

  checkTransactions(num:number): any[] {
    let trans = [];
    let date = new Date(this.info.getYear(), this.info.getMonth(), num);
    let index = 0;
    this.filtered_trans.forEach(transaction => {
      if (date.getTime() === new Date(transaction.date).getTime()) {
        trans.push(transaction);
      }
      index++;
    });
    return trans;
  }

  findBlankSpacesForward(): void {
    let new_blanks_front = (this.days_in_month + this.blanks_front) % 7;
    this.days_in_month = this.info.findDaysInMonth();
    if (this.days_in_month + new_blanks_front > 35) {
      this.blanks_back = 42 - this.days_in_month - new_blanks_front;
      this.moreThan5Rows = true;
    } else {
      this.blanks_back = 35 - this.days_in_month - new_blanks_front;
      this.moreThan5Rows = false;
    }
    this.blanks_front = new_blanks_front;
    this.fillDateArrays();
  }

  findBlankSpacesBackward(): void {
    let new_blanks_back = 7 - this.blanks_front;
    this.days_in_month = this.info.findDaysInMonth();
    if (this.days_in_month + new_blanks_back > 35) {
      this.blanks_front = 42 - this.days_in_month - new_blanks_back;
      this.moreThan5Rows = true;
    } else {
      this.blanks_front = 35 - this.days_in_month - new_blanks_back;
      this.moreThan5Rows = false;
    }
    this.blanks_back = new_blanks_back;
    this.fillDateArrays();
  }
  
  changeCalendarForward(): void {
    this.info.changeMonthForward();
    this.current_month = this.info.getMonthAsString();
    this.current_year = this.info.getYear();
    this.findBlankSpacesForward();
    this.filterTransactions();
  }

  changeCalendarBackward(): void {
    this.info.changeMonthBackward();
    this.current_month = this.info.getMonthAsString();
    this.current_year = this.info.getYear();
    this.findBlankSpacesBackward();
    this.filterTransactions();
  }

  changeCurrentTrans(event): void {
    let newTrans = {
      account: event.account,
      category: event.category,
      date: event.date,
      description: event.description,
      inflow: event.inflow,
      outflow: event.outflow
    }
    this.currentTrans = newTrans;
  }
}
