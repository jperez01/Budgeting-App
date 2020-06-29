import { Component, OnInit } from '@angular/core';
import DateInfo from '../../../shared/date/dateInfo';

@Component({
  selector: 'app-budget-main',
  templateUrl: './budget-main.component.html',
  styleUrls: ['./budget-main.component.css']
})
export class BudgetMainComponent implements OnInit {
  current_month:string;
  current_year:number;
  info:DateInfo;
  sign:boolean;
  total_budget:number;
  groups;
  constructor() { }

  ngOnInit(): void {
    this.info = new DateInfo();
    this.current_month = this.info.getMonthAsString();
    this.current_year = this.info.getYear();
    this.sign = false;
    this.total_budget = 1000;
    this.groups = [
      {
        title: 'Food',
        items: [
          {
            name: 'Groceries',
            budgeted: 100,
            received: 200
          },
          {
            name: 'Dining Out',
            budgeted: 100,
            received: 200
          },
          {
            name: 'Snacks',
            budgeted: 300,
            received: 200
          }
        ],
        total_budgeted: 500,
        total_received: 600
      },
      {
        title: 'Debts',
        items: [
          {
            name: 'Student Loan',
            budgeted: 100,
            received: 200
          },
          {
            name: 'Mortgage',
            budgeted: 100,
            received: 200
          }
        ],
        total_budgeted: 200,
        total_received: 400
      }
    ];
  }

}
