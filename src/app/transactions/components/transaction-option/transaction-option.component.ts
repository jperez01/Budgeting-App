import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-option',
  templateUrl: './transaction-option.component.html',
  styleUrls: ['./transaction-option.component.css']
})
export class TransactionOptionComponent implements OnInit {
  @Input() itemIndex:number;
  @Input() item:any;
  @Output() sendOptionInfo: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.item);
    console.log(this.itemIndex);
  }

  sendInfo() {
    let info = {
      itemIndex: this.itemIndex,
      item: this.item
    }
    this.sendOptionInfo.emit(info);
    console.log('infoSent');
  }
}
