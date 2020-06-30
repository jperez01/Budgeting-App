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
  groups:any;
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

  updateBudgetInfo(info: any): void {
    let items = this.groups[info.groupIndex].items[info.itemIndex][info.name] = parseFloat(info.newValue);
    this.updateGroupTotal(info.groupIndex);
    this.groups = this.groups.slice();
  }

  updateGroupTotal(index: number): void {
    let group = this.groups[index];
    let items = group.items;
    let newTotalBudget = 0;
    let newTotalReceived = 0;
    items.forEach(item => {
      newTotalBudget += item.budgeted;
      newTotalReceived += item.received;
    });
    group.total_budgeted = newTotalBudget;
    group.total_received = newTotalReceived;
  }
}
