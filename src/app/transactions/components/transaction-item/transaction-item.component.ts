import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() item:any;
  @Input() index:any;
  @Input() filtered:boolean;
  @Output() sendTransaction: EventEmitter<any> = new EventEmitter<any>();
  date_string:string;
  outflow:number;
  inflow:number;
  changingValue:boolean;
  background:string;
  line:string;
  sentItem:boolean;
  newAccount:string;
  newDate:string;
  newCategory:string;
  newDescription:string;
  newInflow:number;
  newOutflow:number;
  groupIndex:number;
  itemIndex:number;
  accountIndex:number;
  oldGroupIndex:number;
  oldItemIndex:number;
  oldAccountIndex:number;
  styleChange:any;
  budgetNames:any[];
  accountNames:any[];
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {

    this.sentItem = false;
    this.background = '';
    this.line = '1px solid #b6bec2';
    this.changingValue = false;
    this.date_string = this.getFormattedDate(this.item.date);
    this.outflow = this.item.outflow.toFixed(2);
    this.inflow = this.item.inflow.toFixed(2);
    this.newAccount = this.item.account;
    this.newCategory = this.item.category;
    this.newDate = this.item.date;
    this.newInflow = this.inflow;
    this.newOutflow = this.outflow;
    this.newDescription = this.item.description;
    this.budgetNames = this.infoService.getBudgetNames();
    this.accountNames = this.infoService.getAccountNames();
    this.itemIndex = null;
    this.accountIndex = null;
    this.groupIndex = null;
    this.oldAccountIndex = null;
    this.oldGroupIndex = null;
    this.oldItemIndex = null;
  }

  confirmChanges(): void {
    if (this.newAccount !== undefined && this.newCategory !== undefined && this.newDate !== undefined
      && this.newDescription !== undefined && this.newInflow !== undefined && this.newOutflow !== undefined
      && this.itemIndex !== undefined && this.accountIndex !== undefined && this.groupIndex !== undefined) {
        if (this.itemIndex === null && this.groupIndex === null) {
          this.collectDefaultCategory();
        }
        if (this.accountIndex === null) {
          this.collectDefaultAccount();
        }
        let newTransaction = {
          account: this.newAccount,
          date: new Date(this.newDate),
          category: this.newCategory,
          description: this.newDescription,
          outflow: Number(this.newOutflow),
          inflow: Number(this.newInflow)
        }
        let newDiff = newTransaction.inflow - newTransaction.outflow;
        let oldDiff = this.inflow - this.outflow;
        let totalDiff = newDiff - oldDiff;
        let sentObject = {
          transaction: newTransaction,
          index: this.index,
          itemIndex: this.itemIndex,
          groupIndex: this.groupIndex,
          accountIndex: this.accountIndex,
          oldItemIndex: this.oldItemIndex,
          oldGroupIndex: this.oldGroupIndex,
          oldAccountIndex: this.oldAccountIndex,
          difference: totalDiff,
          oldDiff: oldDiff,
          newDiff: newDiff
        }
        this.sendTransaction.emit(sentObject);
        this.newAccount = this.item.account;
        this.newCategory = this.item.category;
        this.newDate = this.item.date;
        this.newInflow = this.inflow;
        this.newOutflow = this.outflow;
        this.newDescription = this.item.description;
        this.changingValue = false;
      } else {
        console.log(this.newAccount);
        console.log(this.newCategory);
        console.log(this.newDate);
        console.log(this.newOutflow);
        console.log(this.newInflow);
      }
  }

  formatMoney(value: any): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  cancelChange(): void {
    this.changingValue = false;
    this.background = '';
    this.line = '1px solid #b6bec2';
  }

  changeStyle(): void {
      this.background = '#0091d946';
      this.line = 'none';
      this.changingValue = true;
  }

  getFormattedDate(date: Date): string {
    let year = date.getFullYear();
  
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

  collectDefaultAccount(): void {
    let initialIndex = 0;
    this.accountNames.forEach(name => {
      if (name.localeCompare(this.item.account) === 0) {
        this.accountIndex = initialIndex;
      }
      initialIndex++;
    });
  }

  collectOldAccount(): void {
    let initialIndex = 0;
    this.accountNames.forEach(name => {
      if (name.localeCompare(this.item.account) === 0) {
        this.oldAccountIndex = initialIndex;
      }
      initialIndex++;
    });
  }

  collectAccount(event: any): void {
    if (event.target.value.localeCompare('default') !== 0) {
      let str = event.target.value;
      let account = str.substring(str.indexOf(' ') + 1);
      if (account.localeCompare('') !== 0) {
        this.newAccount = account;
        this.accountIndex = str.substring(0, str.indexOf(' '));
      } else {
        this.newAccount = undefined;
        this.accountIndex = undefined;
      }
      this.collectOldAccount();
    } else {
      this.collectDefaultAccount();
    }
  }

  collectDate(event: any): void {
    if (event.localeCompare('') !== 0) {
      this.newDate = event;
    } else {
      this.newDate = undefined;
    }
  }

  collectDefaultCategory(): void {
    let initialIndex = 0;
    this.budgetNames.forEach(group => {
      group.items.forEach(item => {
        let innerIndex = 0;
        if (this.item.category.localeCompare(item) === 0) {
          this.groupIndex = initialIndex;
          this.itemIndex = innerIndex;
        } else {
          innerIndex++;
        }
      })
      initialIndex++;
    });
  }

  collectOldCategory(): void {
    let initialIndex = 0;
    this.budgetNames.forEach(group => {
      group.items.forEach(item => {
        let innerIndex = 0;
        if (this.item.category.localeCompare(item) === 0) {
          this.oldGroupIndex = initialIndex;
          this.oldItemIndex = innerIndex;
        } else {
          innerIndex++;
        }
      })
      initialIndex++;
    });
  }

  collectCategory(event: any): void {
    if (event.target.value.localeCompare('default') === 0) {
      this.collectDefaultCategory();
    } else {
      let str = event.target.value;
      let category = str.substring(str.indexOf(' ') + 1);
      if (category.localeCompare('') !== 0) {
        this.groupIndex = str.substring(1 + str.indexOf(','), str.indexOf(' '));
        this.itemIndex = str.substring(0, str.indexOf(','));
        this.newCategory = category;
      } else {
        this.newCategory = undefined;
        this.itemIndex = undefined;
        this.groupIndex = undefined;
      }
      this.collectOldCategory();
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
