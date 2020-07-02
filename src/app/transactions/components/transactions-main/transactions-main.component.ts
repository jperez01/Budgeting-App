import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-main',
  templateUrl: './transactions-main.component.html',
  styleUrls: ['./transactions-main.component.css']
})
export class TransactionsMainComponent implements OnInit {
  transactions:Object[];
  constructor() { }

  ngOnInit(): void {
    this.transactions = [
      {
        account: 'John Savings',
        date: new Date(),
        category: 'Food',
        description: 'First Transaction',
        outflow: 10.20,
        inflow: 0.00
      },
      {
        account: 'American Express',
        date: new Date(),
        category: 'Debts',
        description: 'Second Transaction',
        outflow: 500.00,
        inflow: 0.00
      },
      {
        account: 'John Savings',
        date: new Date(),
        category: 'Savings',
        description: 'Third Transaction',
        outflow: 0.00,
        inflow: 1000.00
      },
    ]
  }
}
