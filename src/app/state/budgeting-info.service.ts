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
  accountNames:any[];
  filtered_transactions:Subject<any>;
  emit_budget:Subject<any>;
  login_success:Subject<any>;
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
   }

   createBudgetNames(): void {
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

   createAccountNames(): void {
    this.accountNames = [];
    this.accounts.forEach(account => {
      this.accountNames.push(account.name);
    });
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
      this.createAccountNames();
    })
   }

  emitFilteredTrans(value: Transaction[]): void {
    this.filtered_transactions.next(value);
  }

  emitNewBudget(): void {
    this.emit_budget.next(this.budget);
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

  setBudget(newBudget:BudgetGroup[]) {
    this.budget = newBudget;
    this.changeAccountNames();
    this.changeBudgetNames();
    this.emitNewBudget();
  }

  updateGroup(group): void {
    group.user_id = this.user_id;
    this.fetchService.updateGroup(group);
  }

  updateItem(item): void {
    item.user_id = this.user_id;
    this.fetchService.updateItem(item);
  }

  addGroup(info): void {
    info.user_id = this.user_id;
    this.fetchService.createGroup(info).then(result => {
      info.group_id = result[0].group_id;
      this.budget.push(info);
      this.changeBudgetNames();
      this.emitNewBudget();
    });
  }

  async addItemToGroup(info) {
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
      this.fetchService.updateGroup(newGroupInfo);
    });
  }

  setTransactions(newTransactions:any[], changedIndex: number, isNew: boolean) {
    let changedTransaction:any = newTransactions[changedIndex];
    changedTransaction.user_id = this.user_id;
    if (isNew) {
      this.fetchService.createTransaction(changedTransaction).then(result => {
        newTransactions[changedIndex].trans_id = result;
        this.transactions = newTransactions;
      });
    } else {
      this.fetchService.updateTransaction(changedTransaction);
      this.transactions = newTransactions;
    }
  }

  deleteTransaction(oldTransaction: any, index: number): void {
    this.transactions.splice(index, 1);
    this.fetchService.deleteTransaction(oldTransaction.trans_id);
  }

  setAccounts(newAccounts:Account[]) {
    this.accounts = newAccounts;
  }

  addAccount(account: Account) {
    let newAccount = {
      user_id: this.user_id,
      name: account.name,
      balance: account.balance,
      type: account.type,
      acc_id: 0
    };
    this.fetchService.createAccount(newAccount).then(result => {
      newAccount.acc_id = result[0].acc_id;
      console.log(newAccount);
      this.accounts.push(newAccount);
      this.accountNames.push(newAccount.name);
    })
  }

  changeAccountInfo(index, difference) {
    let oldAccount = this.accounts[index];
    let newAccount = {
      name: oldAccount.name,
      balance: Number(oldAccount.balance),
      type: oldAccount.type,
      acc_id: oldAccount.acc_id
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
  }

  changeOldAccountInfo(index, difference) {
    let oldAccount = this.accounts[index];
     let newAccount = {
      name: oldAccount.name,
      balance: oldAccount.balance,
      type: oldAccount.type,
      acc_id: oldAccount.acc_id
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
  }

  changeBudgetInfo(groupIndex, itemIndex, difference) {
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

  changeOldBudgetInfo(groupIndex, itemIndex, difference) {
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
