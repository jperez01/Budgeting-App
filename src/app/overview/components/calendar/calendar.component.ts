import { Component, OnInit } from '@angular/core';
import DateInfo from '../../../shared/date/dateInfo';

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
  blankfront;
  blankback;
  monthdays;

  constructor() {
    this.blankspacesfront = 0;
    this.blankspacesback = 0;
    this.info = new DateInfo();
  }

  ngOnInit(): void {
    this.current_year = this.info.getYear();
    this.current_month = this.info.getMonthAsString();
    this.days_in_month = this.info.findDaysInMonth();
    this.findBlankSpacesInitial();
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
}
