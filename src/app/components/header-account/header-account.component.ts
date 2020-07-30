import { Component, OnInit, Input } from '@angular/core';
import { BudgetingInfoService } from '../../state/budgeting-info.service';

@Component({
  selector: 'app-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.css']
})
export class HeaderAccountComponent implements OnInit {
  @Input() account;
  @Input() index;
  changingInfo:boolean;
  deletingInfo:boolean;
  balance:string;
  mycolor:string;
  newName:string;
  newBalance:number;
  newType:string;
  newAccountIndex:string;
  accountNames:string[];
  filtered_transactions:any[];
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.newName = null;
    this.newBalance = null;
    this.newAccountIndex = null;
    this.changingInfo = false;
    this.deletingInfo = false;
    if (this.account.balance < 0) {
      this.mycolor = 'red';
    } else {
      this.mycolor = 'green';
    }
    this.balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.account.balance);
    this.accountNames = this.infoService.getAccountNames();
    this.filtered_transactions = [];
  }

  setUpDelete(): void {
    let transactions = this.infoService.getTransactions();
    let index = 0;
    transactions.forEach(transaction => {
      if (transaction.account.localeCompare(this.account.name) === 0) {
        this.filtered_transactions.push({
          transaction: transaction,
          index: index
        });
      }
      index++;
    });
    this.deletingInfo = !this.deletingInfo;
  }

  deleteAccount(): void {
    if (this.newAccountIndex !== null) {
      this.filtered_transactions.forEach(info => {
        let transaction = info.transaction;
        let difference = transaction.inflow - transaction.outflow;
        this.infoService.changeTransactionAccount(info.transaction, info.index, this.newAccountIndex);
        this.infoService.changeAccountInfo(this.newAccountIndex, difference);
      });
      this.infoService.deleteAccount(this.index);
    }
  }

  changeAccount(): void {
    if (this.newName === null) {
      this.newName = this.account.name;
    }
    if (this.newBalance === null) {
      this.newBalance = this.account.balance;
    }
    if (this.newType === null) {
      this.newType = this.account.type;
    }
    let info = {
      name: this.newName,
      balance: this.newBalance,
      type: this.newType,
      index: this.index
    };
    this.infoService.changeAccount(info);
  }

  cancelChange(): void {
    this.changingInfo = false;
    this.newName = null;
    this.newBalance = null;
  }

  collectName(event): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = null;
    }
  }

  collectBalance(event): void {
    if (event.target.value.localeCompare('') === 0) {
      this.newBalance = null;
    } else {
      if (!isNaN(event.target.value % 1)) {
        this.newBalance = event.target.value;
      } else {
        this.newBalance = null;
      }
    }
  }

  collectType(event): void {
    if (event.target.value.localeCompare('Choose One') !== 0) {
      this.newType = event.target.value;
    } else {
      this.newType = null;
    }
  }

  collectAccount(event): void {
    if (event.target.value.localeCompare('Choose One') !== 0) {
      this.newAccountIndex = event.target.value;
    } else {
      this.newAccountIndex = null;
    }
  }
}
