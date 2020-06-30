import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() group;
  items: any;
  @Input() groupIndex;
  @Output() valueBubble: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.items = this.group.items;
    console.log(this.groupIndex);
  }

  sendValueUp(event: any): void {
    this.valueBubble.emit(event);
  }
}
