import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups;
  constructor() { }

  ngOnInit(): void {
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
        ]
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
        ]
      }
    ]
  }

}
