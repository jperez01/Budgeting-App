import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.css']
})
export class HeaderAccountComponent implements OnInit {
  @Input() account;
  balance:string;
  mycolor:string;
  constructor() { }

  ngOnInit(): void {
    if (this.account.balance < 0) {
      this.mycolor = 'red';
    } else {
      this.mycolor = 'green';
    }
    this.balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.account.balance);
  }

}
