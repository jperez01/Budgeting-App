import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../state/budgeting-info.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class Settings implements OnInit {
  email:string;
  username:string;
  password:string;
  newEmail:string;
  newUsername:string;
  newPassword:string;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    let info = this.infoService.getLoginInfo();
    this.email = info.email;
    this.username = info.username;
    this.password = info.password;
    this.newEmail = null;
    this.newUsername = null;
    this.newPassword = null;
  }

  submitChange(): void {
    let info = {
      email: this.newEmail,
      username: this.newUsername,
      password: this.newPassword
    };
    if (info.email === null) {
      info.email = this.email;
    }
    if (info.username === null) {
      info.username = this.username;
    }
    if (info.password === null) {
      info.password = this.password;
    }
    this.infoService.changeLogin(info);
    this.email = info.email;
    this.username = info.username;
    this.password = info.password;

    this.newEmail = null;
    this.newUsername = null;
    this.newPassword = null;
  }

  collectEmail(event): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newEmail = event.target.value;
    } else {
      this.newEmail = null;
    }
  }

  collectUsername(event): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newUsername = event.target.value;
    } else {
      this.newUsername = null;
    }
  }

  collectPassword(event): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newPassword = event.target.value;
    } else {
      this.newPassword = null;
    }
  }
}
