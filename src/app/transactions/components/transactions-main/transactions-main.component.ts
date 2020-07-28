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
  budgetNames:any[];
  accountNames:any[];
  accountIndex:number;
  groupIndex:number;
  itemIndex:number;

  constructor(private route: ActivatedRoute, private infoService:BudgetingInfoService) {
    this.newDate = '06/07/01';
    this.newDescription = 'Description';
    this.newInflow = 0.00;
    this.newOutflow = 0.00;
    this.filtered_transactions = [];
    this.groupIndex = 0;
    this.itemIndex = 0;
    this.accountIndex = 0;
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
    });
    this.accountNames = this.infoService.getAccountNames();
    this.budgetNames = this.infoService.getBudgetNames();
    this.newAccount = this.accountNames[0];
    this.newCategory = this.budgetNames[0].items[0];
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

  deleteTransaction(info): void {
    let transaction = this.transactions[info.index];
    this.infoService.changeOldBudgetInfo(info.groupIndex, info.itemIndex, info.difference);
    this.infoService.changeOldAccountInfo(info.accountIndex, info.difference);
    this.infoService.deleteTransaction(transaction, info.index);
    this.transactions = this.infoService.getTransactions();
    this.accounts = this.infoService.getAccounts();
    this.calculateTotalBalance();
  }

  checkForChanges(info): void {
    if (info.accountIndex !== null) {
      let accIndex = Number(info.accountIndex);
      if (info.oldAccountIndex !== null) {
        this.infoService.changeAccountInfo(accIndex, info.newDiff);
        this.infoService.changeOldAccountInfo(info.oldAccountIndex, info.oldDiff);
      } else {
        this.infoService.changeAccountInfo(accIndex, info.difference);
      }
    }
    if (info.itemIndex !== null && info.groupIndex !== null) {
      let itmIndex = Number(info.itemIndex);
      let grpIndex = Number(info.groupIndex);
      if (info.oldGroupIndex !== null && info.oldItemIndex !== null) {
        this.infoService.changeBudgetInfo(grpIndex, itmIndex, info.newDiff);
        this.infoService.changeOldBudgetInfo(info.oldGroupIndex, info.oldItemIndex, info.oldDiff);
      } else {
        this.infoService.changeBudgetInfo(grpIndex, itmIndex, info.difference);
      }
    }
  }

  checkforChangesNewTrans(difference): void {
    if (this.accountIndex !== null) {
      let accIndex = Number(this.accountIndex);
      this.infoService.changeAccountInfo(accIndex, difference);
    }
    if (this.itemIndex !== null && this.groupIndex !== null) {
      let itmIndex = Number(this.itemIndex);
      let grpIndex = Number(this.groupIndex);
      this.infoService.changeBudgetInfo(grpIndex, itmIndex, difference);
    }
  }

  calculateTotalBalance(): void {
    if (this.name.localeCompare('All') === 0) {
      let total = 0;
      this.accounts.forEach(account => {
        total += Number(account.balance);
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

  resetNewInfo(): void {
    this.newAccount = this.accountNames[0];
    this.newCategory = this.budgetNames[0].items[0];
    this.newDate = '06/21/01';
    this.newInflow = 0.00;
    this.newOutflow = 0.00;
    this.newDescription = 'Description';
  }

  changeTransaction(info: any): void {
    this.transactions[info.index] = info.transaction;
    this.infoService.setTransactions(this.transactions, info.index, false);
    this.checkForChanges(info);
    this.filterTransactions();
    this.calculateTotalBalance();
  }

  addNewTransaction(): void {
    if (this.newAccount !== undefined && this.newCategory !== undefined && this.newDate !== undefined
      && this.newDescription !== undefined && this.newInflow !== undefined && this.newOutflow !== undefined) {
        let newTransaction = {
          account: this.newAccount,
          date: this.newDate,
          category: this.newCategory,
          description: this.newDescription,
          outflow: Number(this.newOutflow),
          inflow: Number(this.newInflow)
        }
        let difference = newTransaction.inflow - newTransaction.outflow;
        this.checkforChangesNewTrans(difference);
        this.transactions.unshift(newTransaction);
        this.infoService.setTransactions(this.transactions, 0, true);
        this.addingTransaction = false;
        this.resetNewInfo();
        this.calculateTotalBalance();
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
    if (event.target.value.localeCompare('') !== 0) {
      let str = event.target.value;
      let account = str.substring(str.indexOf(' ') + 1);
      this.newAccount = account;
      this.accountIndex = str.substring(0, str.indexOf(' '));
      console.log(this.newAccount);
      console.log(this.accountIndex);
    } else {
      this.newAccount = undefined;
    }
  }

  collectDate(event: any): void {
    console.log(event);
    this.newDate = event;
  }

  collectCategory(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      let str = event.target.value;
      let category = str.substring(str.indexOf(' ') + 1);
      if (category.localeCompare('') !== 0) {
        this.groupIndex = str.substring(1 + str.indexOf(','), str.indexOf(' '));
        this.itemIndex = str.substring(0, str.indexOf(','));
        this.newCategory = category;
      }
    }
  }

  collectDescription(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
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
