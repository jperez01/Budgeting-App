import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions-main',
  templateUrl: './transactions-main.component.html',
  styleUrls: ['./transactions-main.component.css']
})
export class TransactionsMainComponent implements OnInit {
  name:string;
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

  constructor(private route: ActivatedRoute) {
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
    this.accounts = [
      {
        name: 'American Express',
        balance: 200
      },
      {
        name: 'John Savings',
        balance: 1000
      }
    ]
    this.transactions = [
      {
        account: 'John Savings',
        date: new Date(),
        category: 'Food',
        description: 'First Transaction',
        outflow: 10.20,
        inflow: 0.00
      },
      {
        account: 'American Express',
        date: new Date(),
        category: 'Debts',
        description: 'Second Transaction',
        outflow: 500.00,
        inflow: 0.00
      },
      {
        account: 'John Savings',
        date: new Date(),
        category: 'Savings',
        description: 'Third Transaction',
        outflow: 0.00,
        inflow: 1000.00
      },
    ];
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
    this.transactions.forEach(transaction => {
      if (transaction.account.localeCompare(this.name) === 0) {
        this.filtered_transactions.push(transaction);
      }
    });
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
    this.transactions[info.index] = info.transaction;
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
