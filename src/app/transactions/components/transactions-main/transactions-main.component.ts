import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-transactions-main',
  templateUrl: './transactions-main.component.html',
  styleUrls: ['./transactions-main.component.css']
})
export class TransactionsMainComponent implements OnInit {
  name:string;
  observable$;
  filtered_transactions:any[];
  transactions:any[];
  accounts:any[];
  addingTransaction:boolean;
  filtered:boolean;
  newAccount:string;
  newDate:string;
  newCategory:string;
  newDescription:string;
  newInflow:number;
  newOutflow:number;
  total_balance:number;

  constructor(private route: ActivatedRoute, private infoService:BudgetingInfoService) {
    this.newAccount = undefined;
    this.newDate = undefined;
    this.newCategory = undefined;
    this.newDescription = undefined;
    this.newInflow = undefined;
    this.newOutflow = undefined;
    this.filtered_transactions = [];
  }

  ngOnInit(): void {
    this.addingTransaction = false;
    this.transactions = this.infoService.getTransactions();
    this.accounts = this.infoService.getAccounts();
    this.route.params.subscribe(paramsId => {
      this.name = paramsId.id;
      if (this.name.localeCompare('All') !== 0) {
        this.filtered_transactions = [];
        this.filterTransactions();
        this.filtered = true;
      } else {
        this.filtered_transactions = this.transactions;
        this.filtered = false;
      }
      this.calculateTotalBalance();
    })
  }

  filterTransactions(): void {
    if (this.name.localeCompare('All') === 0) {
      this.filtered_transactions = this.transactions;
    } else {
      this.filtered_transactions = [];
      this.transactions.forEach(transaction => {
        if (transaction.account.localeCompare(this.name) === 0) {
          this.filtered_transactions.push(transaction);
        }
      });
    }
  }

  formatMoney(value: any): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  calculateTotalBalance(): void {
    if (this.name.localeCompare('All') === 0) {
      let total = 0;
      this.accounts.forEach(account => {
        total += account.balance;
      })
      this.total_balance = total;
    } else {
      this.accounts.forEach(account => {
        if (account.name.localeCompare(this.name) === 0) {
          this.total_balance = account.balance;
        }
      })
    }
  }

  changeTransaction(info: any): void {
    console.log(info);
    this.transactions[info.index] = info.transaction;
    this.infoService.setTransactions(this.transactions);
    if (info.accountIndex !== null) {
      let accIndex = Number(info.accountIndex);
      this.infoService.changeAccountInfo(accIndex, info.difference);
    }
    if (info.itemIndex !== null && info.groupIndex !== null) {
      let itmIndex = Number(info.itemIndex);
      let grpIndex = Number(info.groupIndex);
      this.infoService.changeBudgetInfo(grpIndex, itmIndex, info.difference);
    }
    this.filterTransactions();
  }

  addNewTransaction(): void {
    if (this.newAccount !== undefined && this.newCategory !== undefined && this.newDate !== undefined
      && this.newDescription !== undefined && this.newInflow !== undefined && this.newOutflow !== undefined) {
        let newTransaction = {
          account: this.newAccount,
          date: new Date(this.newDate),
          category: this.newCategory,
          description: this.newDescription,
          outflow: Number(this.newOutflow),
          inflow: Number(this.newInflow)
        }
        this.transactions.unshift(newTransaction);
        this.infoService.setTransactions(this.transactions);
        this.addingTransaction = false;
        this.newAccount = undefined;
        this.newCategory = undefined;
        this.newDate = undefined;
        this.newInflow = undefined;
        this.newOutflow = undefined;
        this.newDescription = undefined;
      } else {
        console.log(this.newAccount);
        console.log(this.newCategory);
        console.log(this.newDate);
        console.log(this.newOutflow);
        console.log(this.newInflow);
        console.log(typeof this.newOutflow);
      }
      this.filterTransactions();
  }

  collectAccount(event: any): void {
    if (event.target.value.localeCompare('Account') !== 0 && event.target.value.localeCompare('') !== 0) {
      this.newAccount = event.target.value;
    } else {
      this.newAccount = undefined;
    }
  }

  collectDate(event: any): void {
    if (event.target.value.localeCompare('06/20/01') !== 0 && event.target.value.localeCompare('') !== 0) {
      this.newDate = event.target.value;
    } else {
      this.newDate = undefined;
    }
  }

  collectCategory(event: any): void {
    if (event.target.value.localeCompare('Category') !== 0 && event.target.value.localeCompare('') !== 0) {
      this.newCategory = event.target.value;
    } else {
      this.newCategory = undefined;
    }
  }

  collectDescription(event: any): void {
    if (event.target.value.localeCompare('Description') !== 0 && event.target.value.localeCompare('') !== 0) {
      this.newDescription = event.target.value;
    } else {
      this.newDescription = undefined;
    }
  }

  collectOutflow(event: any): void {
    if (!isNaN(event.target.value % 1)) {
      this.newOutflow = event.target.value;
    } else {
      this.newOutflow = undefined;
    }
  }

  collectInflow(event: any): void {
    if (!isNaN(event.target.value % 1)) {
      this.newInflow = event.target.value;
    } else {
      this.newInflow = undefined;
    }
  }
}
