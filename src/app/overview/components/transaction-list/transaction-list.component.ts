import { Component, OnInit } from '@angular/core';
import Transaction from '../../models/transaction';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions:Transaction[];

  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.transactions = this.infoService.getTransactions();
  }

}
