import { Component, OnInit, Input } from '@angular/core';
import Transaction from '../../../models/transaction';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction: Transaction;
  constructor() { }

  ngOnInit(): void {
  }

  setClasses() {
    let classes = {
      transaction: true,
      'taken': this.transaction.taken
    }
    return classes;
  }
}
