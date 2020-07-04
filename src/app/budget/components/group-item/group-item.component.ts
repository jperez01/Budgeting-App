import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() item:any;
  @Input() groupName:any;
  @Input() groupIndex:any;
  @Input() itemIndex:any;
  @Output() changedValue: EventEmitter<any> = new EventEmitter<any>();
  changingValue:boolean;
  available:number;
  name:string;
  budgeted:any;
  received:any;
  storedValue:any;
  background:string;
  oldItem:any;

  constructor() {
    this.changingValue = false;
  }

  ngOnInit(): void {
    this.budgeted = this.item.budgeted
    this.received = this.item.received;
    this.name = this.item.name;
    this.available = this.item.budgeted - this.item.received;
    this.background = '#0091d946';
    this.oldItem = null;
  }

  changeStyle(): void {
    this.changingValue = true;
    this.oldItem = {
      name: this.name,
      budgeted: this.budgeted,
      received: this.received
    }
  }

  sendValue(event: any): void {
      let newItem = {
        name: this.name,
        budgeted: parseFloat(this.budgeted),
        received: parseFloat(this.received)
      }
      let info = {
        itemIndex: this.itemIndex,
        groupIndex: this.groupIndex,
        item: newItem
      };
      this.changedValue.emit(info);
      this.available = this.budgeted - this.received;
  }

  collectName(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.name = event.target.value;
    }
  }

  collectBudgeted(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.budgeted = event.target.value;
    }
  }

  collectReceived(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.received = event.target.value;
    }
  }

  cancelChanges(): void {
    this.changingValue = false;
    this.name = this.oldItem.name;
    this.budgeted = this.oldItem.budgeted;
    this.received = this.oldItem.received;
  }
}
