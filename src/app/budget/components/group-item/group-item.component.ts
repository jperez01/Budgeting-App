import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() item;
  available:number;
  constructor() { }

  ngOnInit(): void {
    this.available = this.item.budgeted - this.item.received;
  }

}
