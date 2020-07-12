import { Component, OnInit, Input } from '@angular/core';
import Account from '../../models/account';

@Component({
  selector: 'app-ov-account',
  templateUrl: './ov-account.component.html',
  styleUrls: ['./ov-account.component.css']
})
export class OvAccountComponent implements OnInit {
  @Input() account: Account;
  color:string;
  constructor() { }

  ngOnInit(): void {
    this.checkBalance();
  }

  checkBalance(): void {
    if (this.account.balance > 0) {
      this.color = 'green';
    } else if (this.account.balance < 0) {
      this.color = 'red';
    } else {
      this.color = 'black';
    }
  }
  formatMoney(number:number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }
}
