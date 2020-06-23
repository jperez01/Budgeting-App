import { Component, OnInit, Input } from '@angular/core';
import Transaction from '../../models/transaction';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction: Transaction;
  cost:string;
  constructor() { }

  ngOnInit(): void {
    this.cost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.transaction.amount);
  }
}
