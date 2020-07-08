import { Component, OnInit } from '@angular/core';
import Account from '../../models/account';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-ov-accounts',
  templateUrl: './ov-accounts.component.html',
  styleUrls: ['./ov-accounts.component.css']
})
export class OvAccountsComponent implements OnInit {
  accounts:Account[];
  currentAccount:Account;
  index:number;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.index = 0;
    this.accounts = this.infoService.getAccounts();
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
