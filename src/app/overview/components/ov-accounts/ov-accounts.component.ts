import { Component, OnInit } from '@angular/core';
import Account from '../../models/account';

@Component({
  selector: 'app-ov-accounts',
  templateUrl: './ov-accounts.component.html',
  styleUrls: ['./ov-accounts.component.css']
})
export class OvAccountsComponent implements OnInit {
  accounts:Account[];
  currentAccount:Account;
  index:number;
  constructor() { }

  ngOnInit(): void {
    this.index = 0;
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
    ];
    this.currentAccount = this.accounts[this.index];
  }
  
  MoveAccountsForward(): void {
    this.index++;
    if (this.index >= this.accounts.length) {
      this.index = 0;
      this.currentAccount = this.accounts[this.index];
    } else {
      this.currentAccount = this.accounts[this.index];
    }
  }

  MoveAccountsBackward(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.accounts.length - 1;
      this.currentAccount = this.accounts[this.index];
    } else {
      this.currentAccount = this.accounts[this.index];
    }
  }
}
