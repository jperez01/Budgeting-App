import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  failedAuth:boolean;
  constructor(private infoService: BudgetingInfoService, private router: Router) { }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.failedAuth = false;
  }

  login(): void {
    if (this.username.localeCompare('') !== 0 && this.password.localeCompare('') !== 0) {
      fetch(`http://localhost:5000/login/${this.username}/${this.password}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }).then(res => res.json())
      .then(info => {
        if (info.length === 0) {
          this.failedAuth = true;
        } else {
          this.infoService.setUpLoginInfo(info[0]);
          this.router.navigateByUrl('/instructions');
        }
      });
    }
  }

  collectUsername(event): void {
    this.username = event.target.value;
  }
  collectPassword(event): void {
    this.password = event.target.value;
  }
}
