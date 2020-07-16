import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  login(): void {
    console.log(this.password);
    console.log(this.username);
  }

  collectUsername(event): void {
    this.username = event.target.value;
  }
  collectPassword(event): void {
    this.password = event.target.value;
  }
}
