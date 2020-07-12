import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../state/budgeting-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accounts;
  addingAccount:boolean;
  newName:string;
  newBalance:number;
  newType:string;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.newBalance = null;
    this.newName = null;
    this.newType = null;
    this.addingAccount = false;
    this.accounts = this.infoService.getAccounts();
    setInterval(() => {
      this.accounts = this.infoService.getAccounts();
    }, 500);
  }

  addNewAccount(): void {
    if (this.newBalance !== null && this.newName !== null && this.newType !== null) {
      let newAccount = {
        name: this.newName,
        type: this.newType,
        balance: this.newBalance
      }
      this.infoService.addAccount(newAccount);
      this.newBalance = null;
      this.newName = null;
      this.newType = null;
      this.addingAccount = false;
    }
  }

  collectName(event): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newName = event.target.value;
    } else {
      this.newName = null;
    }
  }

  collectBalance(event): void {
    if (event.target.value.localeCompare('') === 0) {
      this.newBalance = null;
    } else {
      if (!isNaN(event.target.value % 1)) {
        this.newBalance = event.target.value;
      } else {
        this.newBalance = null;
      }
    }
  }

  collectType(event): void {
    if (event.target.value.localeCompare('Choose One') !== 0) {
      this.newType = event.target.value;
    } else {
      this.newType = null;
    }
  }
}
