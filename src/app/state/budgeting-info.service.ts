import { Injectable } from '@angular/core';
import { BudgetGroup } from '../shared/models/BudgetGroup';
import { Account } from '../shared/models/Account';
import { Transaction } from '../shared/models/Transaction';
import { initialInfo } from './initialInfo';

@Injectable({
  providedIn: 'root'
})
export class BudgetingInfoService {
  budget:BudgetGroup[];
  transactions:Transaction[];
  accounts:Account[];

  constructor() {
    this.budget = initialInfo.budget;
    this.transactions = initialInfo.transactions;
    this.accounts = initialInfo.accounts;
   }

  getAll() {
    return {
      budget: this.budget,
      transactions: this.transactions,
      accounts: this.accounts
    };
  }

  getBudget() {
    return this.budget;
  }

  getTransactions() {
    return this.transactions;
  }

  getAccounts() {
    return this.accounts;
  }

  setBudget(newBudget:BudgetGroup[]) {
    this.budget = newBudget;
  }

  setTransactions(newTransactions:Transaction[]) {
    this.transactions = newTransactions;
  }

  setAccounts(newAccounts:Account[]) {
    this.accounts = newAccounts;
  }
}
