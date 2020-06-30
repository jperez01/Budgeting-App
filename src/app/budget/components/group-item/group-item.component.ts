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
  available:number;
  budgetedClicked:boolean;
  usedClicked:boolean;
  storedValue:any;

  constructor() { 
    this.usedClicked = false;
    this.budgetedClicked = false;
  }

  ngOnInit(): void {
    this.available = this.item.budgeted - this.item.received;
  }

  sendValue(event: any): void {
    if (this.storedValue.localeCompare(event.target.value) !== 0) {
      let info = {
        itemIndex: this.itemIndex,
        newValue: event.target.value,
        groupIndex: this.groupIndex,
        name: event.srcElement.id
      };
      this.changedValue.emit(info);
    }
    this.available += event.target.value - this.storedValue;
  }

  storeUsedValue(event: any): void {
    this.storedValue = event.target.value;
  }
}
