import { Injectable } from '@angular/core';
import { BudgetGroup } from '../shared/models/BudgetGroup';
import { Account } from '../shared/models/Account';
import { Transaction } from '../shared/models/Transaction';
import { Subject } from 'rxjs';
import { initialInfo } from './initialInfo';
import FetchMethods from './fetch-methods';

@Injectable({
  providedIn: 'root'
})

export class BudgetingInfoService {
  fetchService:FetchMethods;
  budget:BudgetGroup[];
  transactions:Transaction[];
  accounts:Account[];
  budgetNames:any[];
  accountNames:string[];
  filtered_transactions:Subject<any>;
  emit_budget:Subject<any>;
  login_success:Subject<any>;
  emit_accounts:Subject<any>;
  username:string;
  email:string;
  password:string;
  user_id:number;

  constructor() {
    this.fetchService = new FetchMethods();
    this.budget = [];
    this.transactions = [];
    this.accounts = [];
    this.accountNames = [];
    this.budgetNames = [];
    this.filtered_transactions = new Subject<Transaction[]>();
    this.emit_budget = new Subject<Transaction[]>();
    this.login_success = new Subject<boolean>();
    this.emit_accounts = new Subject<string[]>();
   }

  emitFilteredTrans(value: Transaction[]): void {
    this.filtered_transactions.next(value);
  }

  emitNewBudget(): void {
    this.emit_budget.next(this.budget);
  }

  emitNewAccounts(): void {
    this.emit_accounts.next(this.accounts);
  }

   setUpLoginInfo(info): void {
    this.email = info.email;
    this.username = info.username;
    this.password = info.password;
    this.user_id = info.user_id;
    this.login_success.next(true);
    this.fetchService.getGroups(this.user_id).then(result => {
      let groups = result;
      groups.forEach(group => {
        let newGroup = {
          title: group.title,
          items: [],
          group_id: group.group_id,
          total_received: group.total_received,
          total_budgeted: group.total_budgeted
        };
        this.fetchService.getItems(group.group_id).then(result => {
          newGroup.items = result;
          this.budget.push(newGroup);
          let itemNames = [];
          newGroup.items.forEach(item => {
            itemNames.push(item.name);
          });
          this.budgetNames.push({
            title: group.title,
            items: itemNames
          });
        });
      });
    });
    this.fetchService.getTransactions(this.user_id).then(result => {
      this.transactions = result;
    })
    this.fetchService.getAccounts(this.user_id).then(result => {
      this.accounts = result;
      this.changeAccountNames();
      this.emitNewAccounts();
    })
   }

  changeLogin(info: any): void {
    info.user_id = this.user_id;
    this.fetchService.updateUser(info);
    this.email = info.newEmail;
    this.password = info.newPassword;
    this.username = info.newUsername;
  }

  getAll() {
    return {
      budget: this.budget,
      transactions: this.transactions,
      accounts: this.accounts
    };
  }

  getBudgetNames() {
    return this.budgetNames;
  }

  getLoginInfo(): any {
    return {
      email: this.email,
      username: this.username,
      password: this.password
    };
  }

  getUserId(): any {
    return this.user_id;
  }
  getAccountNames() {
    return this.accountNames;
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


  updateGroup(index:number): void {
    let group = this.budget[index];
    let items = group.items;
    let newTotalBudget = 0;
    let newTotalReceived = 0;
    items.forEach(item => {
      newTotalBudget += Number(item.budgeted);
      newTotalReceived += Number(item.received);
    });
    group.total_budgeted = newTotalBudget;
    group.total_received = newTotalReceived;
    this.fetchService.updateGroup(group);
    this.emitNewBudget();
  }

  updateItem(item:any, itemIndex: number, groupIndex: number): void {
    this.budget[groupIndex].items[itemIndex] = item;
    item.user_id = this.user_id;
    this.fetchService.updateItem(item);
    this.updateGroup(groupIndex);
  }

  addAccount(account: Account) {
    let newAccount = {
      user_id: account.user_id,
      name: account.name,
      balance: account.balance,
      type: account.type,
      acc_id: 0
    };
    this.fetchService.createAccount(newAccount).then(result => {
      newAccount.acc_id = result[0].acc_id;
      this.accounts.push(newAccount);
      this.accountNames.push(newAccount.name);
      this.emitNewAccounts();
    })
  }

  addGroup(info:any): void {
    info.user_id = this.user_id;
    this.fetchService.createGroup(info).then(result => {
      info.group_id = result[0].group_id;
      this.budget.push(info);
      this.changeBudgetNames();
      this.emitNewBudget();
    });
  }

  async addItemToGroup(info:any) {
    let newItem = {
      name: info.name,
      budgeted: parseFloat(info.budgeted),
      received: 0.00,
      group_id: this.budget[info.groupIndex].group_id,
      item_id: null
    };
    this.fetchService.createItem(newItem).then(result => {
      newItem.item_id = result[0].item_id;
      this.budget[info.groupIndex].items.push(newItem);
      let budgeted_before = this.budget[info.groupIndex].total_budgeted;
      this.budget[info.groupIndex].total_budgeted = Number(budgeted_before) + newItem.budgeted;
      let changedGroup = this.budget[info.groupIndex];
      let newGroupInfo = {
        group_id: changedGroup.group_id,
        total_budgeted: changedGroup.total_budgeted,
        total_received: changedGroup.total_received
      }
      this.changeBudgetNames();
      this.fetchService.updateGroup(newGroupInfo);
      this.emitNewBudget();
    });
  }

  addTransaction(transaction): void {
    this.transactions.unshift(transaction);
    transaction.user_id = this.user_id;
    this.fetchService.createTransaction(transaction).then(result => {
      this.transactions[0].trans_id = result[0].trans_id;
    });
  }

  changeTransaction(changedTransaction, changedIndex:number): void {
    changedTransaction.user_id = this.user_id;
    this.fetchService.updateTransaction(changedTransaction);
    this.transactions[changedIndex] = changedTransaction;
  }

  changeTransactionAccount(transaction:Transaction, trans_index:number, account_index:number) {
    let account = this.accounts[account_index];
    transaction.account = account.name;
    this.transactions[trans_index] = transaction;
    this.fetchService.updateTransaction(transaction);
  }

  changeTransactionCategory(transaction:Transaction, index:number, category:string) {
    transaction.category = category;
    this.transactions[index] = transaction;
    this.fetchService.updateTransaction(transaction);
  }

  changeAccount(info:any): void {
    let oldAccount = this.accounts[info.index];
    info.acc_id = oldAccount.acc_id;
    info.user_id = oldAccount.user_id;
    this.accounts[info.index] = info;
    this.fetchService.updateAccount(info);
    this.emitNewAccounts();
  }

  changeAccountInfo(index:number, difference:number) {
    let oldAccount = this.accounts[index];
    let newAccount = {
      name: oldAccount.name,
      balance: Number(oldAccount.balance),
      type: oldAccount.type,
      acc_id: oldAccount.acc_id,
      user_id: oldAccount.user_id
    };
    newAccount.balance += difference;
    this.accounts[index] = newAccount;

    let info = {
      name: oldAccount.name,
      balance: newAccount.balance,
      type: oldAccount.type,
      acc_id: oldAccount.acc_id,
      user_id: this.user_id
    }
    this.fetchService.updateAccount(info);
    this.emitNewAccounts();
  }

  changeOldAccountInfo(index:number, difference:number) {
    let oldAccount = this.accounts[index];
     let newAccount = {
      name: oldAccount.name,
      balance: oldAccount.balance,
      type: oldAccount.type,
      acc_id: oldAccount.acc_id,
      user_id: oldAccount.user_id
    }
    newAccount.balance -= difference;
    this.accounts[index] = newAccount;
    
    let info = {
      name: oldAccount.name,
      balance: newAccount.balance,
      type: oldAccount.type,
      acc_id: oldAccount.acc_id,
      user_id: this.user_id
    }
    this.fetchService.updateAccount(info);
    this.emitNewAccounts();
  }

  changeBudgetInfo(groupIndex:number, itemIndex, difference:number) {
    let trimmedDiff = Math.round(difference * 1e2) / 1e2;
    let newBudget = this.budget[groupIndex].items[itemIndex];
    newBudget.received = Number(newBudget.received) - trimmedDiff;

    let newItem = JSON.parse(JSON.stringify(newBudget));
    newItem.user_id = this.user_id;
    this.fetchService.updateItem(newItem);

    this.budget[groupIndex].total_received = Number(this.budget[groupIndex].total_received) - trimmedDiff;
    let newBudgetGroup = {
      title: this.budget[groupIndex].title,
      total_budgeted: this.budget[groupIndex].total_budgeted,
      total_received: this.budget[groupIndex].total_received,
      group_id: this.budget[groupIndex].group_id
    };
    this.fetchService.updateGroup(newBudgetGroup);
  }

  changeOldBudgetInfo(groupIndex:number, itemIndex:number, difference:number) {
    let trimmedDiff = Math.round(difference * 1e2) / 1e2;
    let newBudget = this.budget[groupIndex].items[itemIndex];

    newBudget.received = Number(newBudget.received) + trimmedDiff;
    let newItem = JSON.parse(JSON.stringify(newBudget));
    newItem.user_id = this.user_id;
    this.fetchService.updateItem(newItem);

    this.budget[groupIndex].total_received = Number(this.budget[groupIndex].total_received) + trimmedDiff;
    let newBudgetGroup = {
      title: this.budget[groupIndex].title,
      total_budgeted: this.budget[groupIndex].total_budgeted,
      total_received: this.budget[groupIndex].total_received,
      group_id: this.budget[groupIndex].group_id
    };
    this.fetchService.updateGroup(newBudgetGroup);
  }

  deleteAccount(index: number) {
    let oldAccount = this.accounts[index];
    this.accounts.splice(index, 1);
    this.fetchService.deleteAccount(oldAccount.acc_id);
    this.changeAccountNames();
    this.emitNewAccounts();
  }

  deleteGroup(groupIndex:number): void {
    let oldGroup = this.budget[groupIndex];
    this.budget.splice(groupIndex, 1);
    this.fetchService.deleteGroup(oldGroup.group_id);
    this.changeBudgetNames();
    this.emitNewBudget();
  }

  deleteItemFromGroup(groupIndex:number, itemIndex:number) {
    let oldItem = this.budget[groupIndex].items[itemIndex];
    let oldGroup = this.budget[groupIndex];
    let new_total_budgeted = Number(oldGroup.total_budgeted) - Number(oldItem.budgeted);
    let new_total_received = Number(oldGroup.total_received) - Number(oldItem.received);
    oldGroup.total_budgeted = new_total_budgeted;
    oldGroup.total_received = new_total_received;
    let newGroup = {
      title: oldGroup.title,
      total_budgeted: oldGroup.total_budgeted,
      total_received: oldGroup.total_received,
      group_id: oldGroup.group_id
    };
    this.budget[groupIndex].items.splice(itemIndex, 1);
    this.fetchService.updateGroup(newGroup);
    this.fetchService.deleteItem(oldItem.item_id);
    this.changeBudgetNames();
  }

  deleteTransaction(oldTransaction:Transaction, index: number): void {
    this.transactions.splice(index, 1);
    this.fetchService.deleteTransaction(oldTransaction.trans_id);
  }

  changeBudgetNames(): void {
    this.budgetNames = [];
    this.budget.forEach(group => {
      let itemsNames = [];
      group.items.forEach(item => {
        itemsNames.push(item.name);
      })
      this.budgetNames.push({
        title: group.title,
        items: itemsNames
      });
    });
  }

  changeAccountNames(): void {
    this.accountNames = [];
    this.accounts.forEach(account => {
      this.accountNames.push(account.name);
    });
  }

  changeTransactionsWithName(oldName:string, newName:string): void {
    let comparer = new Intl.Collator();
    this.transactions.forEach(transaction => {
      if (comparer.compare(transaction.category, oldName) === 0) {
        transaction.category = newName;
        let newTransaction = {
          account: transaction.account,
          date: transaction.date,
          category: transaction.category,
          description: transaction.description,
          outflow: transaction.outflow,
          inflow: transaction.inflow,
          user_id: this.user_id
        }
        this.fetchService.updateTransaction(newTransaction);
      }
    })
  }
}
