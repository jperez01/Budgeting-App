import { Component, OnInit } from '@angular/core';
import DateInfo from '../../../shared/date/dateInfo';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-budget-main',
  templateUrl: './budget-main.component.html',
  styleUrls: ['./budget-main.component.css']
})
export class BudgetMainComponent implements OnInit {
  current_month:string;
  current_year:number;
  info:DateInfo;
  sign:boolean;
  total_budget:number;
  groups:any;
  addingGroup:boolean;
  newName:string;
  transactions:any[];
  budgetNames:any[];
  deletingItem:boolean;
  groupIndex:string;
  itemIndex:string;
  oldGroupIndex:number;
  oldItemIndex:number;
  newCategory:string;
  deletedCategory:string;

  constructor(private infoService: BudgetingInfoService) {
    this.info = new DateInfo();
  }

  ngOnInit(): void {
    this.transactions = [];
    this.deletingItem = false;
    this.newName = undefined;
    this.addingGroup = false;
    this.current_month = this.info.getMonthAsString();
    this.current_year = this.info.getYear();
    this.sign = false;
    this.groups = this.infoService.getBudget();
    this.calculateTotalBudget();
    this.newCategory = null;
    this.itemIndex = null;
    this.groupIndex = null;
    this.budgetNames = this.infoService.getBudgetNames();
  }

  updateGroupAndItem(info: any): void {
    this.infoService.updateItem(info.item, info.itemIndex, info.groupIndex);
    this.groups = this.infoService.getBudget();
    this.calculateTotalBudget();
  }

  addItem(info: any): void {
    let newItem = {
      name: info.name,
      budgeted: Number(info.budgeted),
      received: 0
    };
    this.infoService.addItemToGroup(info).then(() => {
      this.groups = this.infoService.getBudget();
      this.changeTotalBudget(newItem.budgeted);
    });
  }

  addGroup(): void {
    if (this.newName !== undefined) {
      let newGroup = {
        title: this.newName,
        items: [],
        total_budgeted: 0.00,
        total_received: 0.00,
        user_id: null
      }
      this.infoService.addGroup(newGroup);
      this.newName = undefined;
      this.addingGroup = false;
    }
  }

  deleteGroup(index: number): void {
    this.infoService.deleteGroup(index);
    this.groups = this.infoService.getBudget();
    this.calculateTotalBudget();
  }

  deleteItem(info: any): void {
    this.oldGroupIndex = info.groupIndex;
    this.oldItemIndex = info.itemIndex;
    this.deletedCategory = info.name;
    this.transactions = [];
    let index = 0;
    this.infoService.getTransactions().forEach(transaction => {
      if (transaction.category.localeCompare(info.name) === 0) {
        this.transactions.push({
          transaction: transaction,
          index: index
        });
      }
      index++;
    });
    this.deletingItem = true;
  }

  confirmDeletion(): void {
    if (this.newCategory !== null && this.itemIndex !== null && this.groupIndex !== null) {
      this.transactions.forEach(info => {
        this.infoService.changeTransactionCategory(info.transaction, info.id, this.newCategory);
        let difference = Number(info.transaction.inflow) - Number(info.transaction.outflow);
        this.infoService.changeBudgetInfo(Number(this.groupIndex), this.itemIndex, difference);
      });
      this.infoService.deleteItemFromGroup(this.oldGroupIndex, this.oldItemIndex);
      this.groups = this.infoService.getBudget();
      this.budgetNames = this.infoService.getBudgetNames();
      this.calculateTotalBudget();
      this.deletingItem = false;
    }
  }

  cancelDeletion(): void {
    this.deletingItem = false;
    this.transactions = [];
    this.newCategory = null;
    this.itemIndex = null;
    this.groupIndex = null;
  }

  collectGroupName(event: any): void {
    if (event.target.value.localeCompare('') !== 0 && event.target.value.localeCompare('Default') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = undefined;
    }
  }

  collectCategory(event: any): void {
    if (event.target.value.localeCompare('default') === 0) {
      this.newCategory = null;
    } else {
      let str = event.target.value;
      let category = str.substring(str.indexOf(' ') + 1);
      if (category.localeCompare(this.deletedCategory) !== 0) {
        this.groupIndex = str.substring(1 + str.indexOf(','), str.indexOf(' '));
        this.itemIndex = str.substring(0, str.indexOf(','));
        this.newCategory = category;
      } else {
        this.newCategory = null;
        this.itemIndex = null;
        this.groupIndex = null;
      }
    }
  }

  changeTotalBudget(change: number): void {
    this.total_budget += change;
  }

  calculateTotalBudget(): void {
    let budgeted_total = 0;
    let received_total = 0;
    this.groups.forEach(group => {
      budgeted_total += Number(group.total_budgeted);
      received_total += Number(group.total_received);
    });
    this.total_budget = budgeted_total - received_total;
  }
}
