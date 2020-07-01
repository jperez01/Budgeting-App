import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() group;
  @Input() groupIndex;
  @Output() valueBubble: EventEmitter<any> = new EventEmitter<any>();
  @Output() addGroupItem: EventEmitter<any> = new EventEmitter<any>();
  items: any;
  addingItem:boolean;
  newBudgeted:number;
  newReceived:number;
  newName:string;
  constructor() { 
    this.addingItem = false;
  }

  ngOnInit(): void {
    this.items = this.group.items;
    this.newBudgeted = 0.00;
    this.newReceived = 0.00;
  }

  bubbleValue(event: any): void {
    this.valueBubble.emit(event);
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
      this.newReceived = undefined;
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

  collectReceived(event: any): void {
    if (!isNaN(event.target.value % 1)) {
      this.newReceived = event.target.value;
    } else {
      this.newReceived = undefined;
    }
  }

  collectName(event: any): void {
    if (event.target.value.localeCompare('') !== 0 && event.target.value.localeCompare('Default') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = undefined;
    }
  }
}
