import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trans-date-picker',
  templateUrl: './trans-date-picker.component.html',
  styleUrls: ['./trans-date-picker.component.css']
})
export class TransDatePickerComponent implements OnInit {
  @Input() defaultDate:Date;
  @Output() datepicker: EventEmitter<any> = new EventEmitter<any>();
  currentDay:number;
  currentMonth:number;
  currentYear:number;
  possibleDays:number[];
  possibleMonths:number[];
  possibleYears:number[];
  isLeapYear:boolean;
  has30Days:boolean;
  has31Days:boolean;
  constructor() { }

  ngOnInit(): void {
    if (this.defaultDate !== null) {
      this.defaultDate = new Date(this.defaultDate);
      this.currentDay = this.defaultDate.getDate();
      this.currentMonth = this.defaultDate.getMonth() + 1;
      this.currentYear = this.defaultDate.getFullYear();
    } else {
      this.currentDay = 1;
      this.currentMonth = 1;
      this.currentYear = 2020;
    }
    this.checkLeapYear();
    this.possibleMonths = [];
    this.possibleDays = [];
    this.possibleYears = [];
    for (let i = 1; i < 13; i++) {
      this.possibleMonths.push(i);
    }
    for (let i = 2018; i < 2025; i++) {
      this.possibleYears.push(i);
    }
    for (let i = 1; i < 29; i++) {
      this.possibleDays.push(i);
    }
    let firstDate = new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
    this.datepicker.emit(firstDate);
    this.checkDayChanges();
  }

  sendDateUp(): void {
    let date = new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
    this.datepicker.emit(date);
  }

  checkSelection(currentValue, value): boolean {
    return currentValue === value;
  }

  checkLeapYear(): void {
    this.isLeapYear = this.currentYear % 4 === 0;
  }

  checkDayChanges() {
    if (this.currentMonth == 2) {
      this.has30Days = false;
      this.has31Days = false;
    } else if (this.currentMonth == 4 || this.currentMonth == 6 || this.currentMonth == 9 || this.currentMonth == 11) {
      this.has30Days = true;
      this.has31Days = false;
    } else {
      this.has30Days = true;
      this.has31Days = true;
    }
  }


  checkDayInconcistency(): void {
    if (this.currentMonth == 2) {
      if (this.isLeapYear && this.currentDay > 29) {
        this.currentDay = 1;
      } else if (!this.isLeapYear && this.currentDay > 28) {
        this.currentDay = 1;
      }
    }
    if (this.has30Days && !this.has31Days) {
      if (this.currentDay > 30) {
        this.currentDay = 1;
      }
    }
  }

  collectMonth(event): void {
    this.currentMonth = event.target.value;
    this.checkDayChanges();
    this.checkDayInconcistency();
    this.sendDateUp();
  }

  collectDay(event): void {
    this.currentDay = event.target.value;
    this.sendDateUp();
  }

  collectYear(event): void {
    this.currentYear = event.target.value;
    this.checkLeapYear();
    this.checkDayInconcistency();
    this.sendDateUp();
  }
}
