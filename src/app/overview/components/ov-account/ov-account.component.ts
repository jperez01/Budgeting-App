import { Component, OnInit, Input } from '@angular/core';
import Account from '../../models/account';

@Component({
  selector: 'app-ov-account',
  templateUrl: './ov-account.component.html',
  styleUrls: ['./ov-account.component.css']
})
export class OvAccountComponent implements OnInit {
  @Input() account: Account;
  balance:string;
  constructor() { }

  ngOnInit(): void {
  }

  formatMoney(number:number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }
}
