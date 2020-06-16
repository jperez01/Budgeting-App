import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  blankspacesfront:number;
  blankspacesback:number;
  today:Date;
  current_month:number;
  month_string:string;
  current_day:number;
  current_year:number;
  weekday:number;
  days_in_month:number;
  blankfront;
  blankback;
  monthdays;

  constructor() {
    this.blankspacesfront = 0;
    this.blankspacesback = 0;
    this.today = new Date();
  }

  ngOnInit(): void {
    this.current_day = this.today.getDate();
    this.weekday = this.today.getDay();
    this.current_year = this.today.getFullYear();
    this.current_month = this.today.getMonth();
    this.findDaysInMonth();
    this.findBlankSpacesInitial();
    this.month_string = this.today.toLocaleDateString('en-US', {month: 'long'});
    this.blankback = Array(this.blankspacesback).fill(null).map((x,i) => i);
    this.blankfront = Array(this.blankspacesfront).fill(null).map((x,i) => i);
    this.monthdays = Array(this.days_in_month).fill(null).map((x,i) => i + 1);
  }

  findBlankSpacesInitial(): void {
    let first_occur = this.current_day % 7;
    this.blankspacesfront = Math.abs(first_occur - this.weekday) + 1;
    if (this.blankspacesfront + this.days_in_month > 35) {
      this.blankspacesback = 42 - (this.blankspacesfront + this.days_in_month);
    } else {
      this.blankspacesback = 35 - (this.blankspacesfront + this.days_in_month);
    }
  }

  findDaysInMonth(): void {
    if (this.current_month === 1) {
      this.days_in_month = 28;
    } else if (this.current_month === 3 || this.current_month === 5 || this.current_month === 9 || this.current_month === 10) {
      this.days_in_month = 30;
    } else {
      this.days_in_month = 31;
    }
  }
}
