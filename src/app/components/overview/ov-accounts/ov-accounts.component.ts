import { Component, OnInit } from '@angular/core';
import Account from '../../../models/account';

@Component({
  selector: 'app-ov-accounts',
  templateUrl: './ov-accounts.component.html',
  styleUrls: ['./ov-accounts.component.css']
})
export class OvAccountsComponent implements OnInit {
  accounts:Account[];
  constructor() { }

  ngOnInit(): void {
    this.accounts = [
      {
        name: "Discover Card",
        balance: 0,
        type: "Credit Card"
      },
      {
        name: "BOA Account",
        balance: 0,
        type: "Savings Account"
      }
    ]
  }

}
