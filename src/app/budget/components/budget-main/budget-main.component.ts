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
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.transactions = [];
    this.deletingItem = false;
    this.newName = undefined;
    this.addingGroup = false;
    this.info = new DateInfo();
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

  updateBudgetInfo(info: any): void {
    this.groups[info.groupIndex].items[info.itemIndex] = info.item;
    this.infoService.updateItem(info.item);
    this.updateGroupTotal(info.groupIndex);
    this.calculateTotalBudget();
    this.infoService.setBudget(this.groups);
    this.groups = this.groups.slice();
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
        this.infoService.changeBudgetInfo(this.groupIndex, this.itemIndex, difference);
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

  addItem(info: any): void {
    let newItem = {
      name: info.name,
      budgeted: Number(info.budgeted),
      received: 0
    };
    this.infoService.addItemToGroup(info).then(() => {
      this.groups = this.infoService.getBudget();
      this.groups = this.groups.slice();
      this.changeTotalBudget(newItem.budgeted);
    });
  }

  updateGroupTotal(index: number): void {
    let group = this.groups[index];
    let items = group.items;
    let newTotalBudget = 0;
    let newTotalReceived = 0;
    items.forEach(item => {
      newTotalBudget += Number(item.budgeted);
      newTotalReceived += Number(item.received);
    });
    group.total_budgeted = newTotalBudget;
    group.total_received = newTotalReceived;
    this.infoService.updateGroup(group);
  }

  collectGroupName(event: any): void {
    if (event.target.value.localeCompare('') !== 0 && event.target.value.localeCompare('Default') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = undefined;
    }
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
      this.infoService.setBudget(this.groups);
    }
  }

  changeTotalBudget(change: number): void {
    this.total_budget += change;
  }

  calculateTotalBudget(): void {
    let budgeted_total = 0;
    let received_total = 0;
    console.log(this.groups);
    this.groups.forEach(group => {
      budgeted_total += Number(group.total_budgeted);
      received_total += Number(group.total_received);
    });
    this.total_budget = budgeted_total - received_total;
  }
}
