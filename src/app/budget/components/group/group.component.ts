import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() group;
  @Input() groupIndex;
  @Output() valueBubble: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteBubble: EventEmitter<any> = new EventEmitter<any>();
  @Output() addGroupItem: EventEmitter<any> = new EventEmitter<any>();
  items: any;
  addingItem:boolean;
  newBudgeted:number;
  newReceived:number;
  newName:string;
  color:string;

  constructor(private infoService: BudgetingInfoService) { 
    this.addingItem = false;
  }

  ngOnInit(): void {
    this.items = this.group.items;
    this.newBudgeted = 0.00;
    this.newReceived = 0.00;
    this.checkAvailableStyle();
    this.infoService.emit_budget.subscribe(() => {
      this.checkAvailableStyle();
    })
  }

  formatMoney(value: any): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  checkAvailableStyle(): void {
    if (this.group.total_budgeted - this.group.total_received > 0) {
      this.color = 'green';
    } else if (this.group.total_budgeted - this.group.total_received < 0) {
      this.color = 'red';
    } else {
      this.color = 'black';
    }
  }

  cancelChanges(): void {
    this.newBudgeted = 0.00;
    this.addingItem = false;
    this.newName = 'Default';
  }

  bubbleValue(event: any): void {
    this.valueBubble.emit(event);
  }
  
  bubbleDelete(event: any): void {
    this.deleteBubble.emit(event);
  }

  sendValueUp(): void {
    if (this.newBudgeted !== undefined && this.newReceived !== undefined && this.newName !== undefined) {
      let newInfo = {
        name: this.newName,
        budgeted: this.newBudgeted,
        received: this.newReceived,
        groupIndex: this.groupIndex
      }
      this.addGroupItem.emit(newInfo);
      this.addingItem = false;
      this.newBudgeted = undefined;
      this.newName = undefined;
    }
  }

  collectBudgeted(event: any): void {
    if (!isNaN(event.target.value % 1)) {
      this.newBudgeted = event.target.value;
    } else {
      this.newBudgeted = undefined;
    }
  }


  collectName(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = undefined;
    }
  }
}
