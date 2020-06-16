import { Component, OnInit } from '@angular/core';
import Transaction from '../../../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions:Transaction[];

  constructor() { }

  ngOnInit(): void {
    this.transactions = [
      {
        id: 1,
        name: "Starbucks",
        picurl: "",
        amount: 1232,
        taken: true
      },
      {
        id: 2,
        name: "McDonalds",
        picurl: "",
        amount: 10,
        taken: false
      }
    ]
  }

}
