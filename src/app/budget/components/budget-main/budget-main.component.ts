import { Component, OnInit } from '@angular/core';
import DateInfo from '../../../shared/date/dateInfo';
import { ThemeService } from 'ng2-charts';

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
  addingGroup:boolean;
  newName:string;
  constructor() { }

  ngOnInit(): void {
    this.newName = undefined;
    this.addingGroup = false;
    this.info = new DateInfo();
    this.current_month = this.info.getMonthAsString();
    this.current_year = this.info.getYear();
    this.sign = false;
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
    this.calculateTotalBudget();
  }

  updateBudgetInfo(info: any): void {
    console.log(info.groupIndex);
    this.groups[info.groupIndex].items[info.itemIndex][info.name] = parseFloat(info.newValue);
    this.updateGroupTotal(info.groupIndex);
    this.calculateTotalBudget();
    this.groups = this.groups.slice();
  }

  addItem(info: any): void {
    let newItem = {
      name: info.name,
      budgeted: parseFloat(info.budgeted),
      received: parseFloat(info.received)
    };
    this.groups[info.groupIndex].items.push(newItem);
    this.updateGroupTotal(info.groupIndex);
    this.calculateTotalBudget();
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

  collectGroupName(event: any): void {
    if (event.target.value.localeCompare('') !== 0 && event.target.value.localeCompare('Default') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = undefined;
    }
  }

  addGroup(): void {
    if (this.newName !== undefined) {
      let newGroup = {
        title: this.newName,
        items: [],
        total_budgeted: 0.00,
        total_received: 0.00
      }
      this.groups.push(newGroup);
      this.newName = undefined;
      this.addingGroup = false;
    }
  }

  calculateTotalBudget(): void {
    let budgeted_total = 0;
    let received_total = 0;
    this.groups.forEach(group => {
      budgeted_total += group.total_budgeted;
      received_total += group.total_received;
    });
    this.total_budget = budgeted_total - received_total;
  }
}
