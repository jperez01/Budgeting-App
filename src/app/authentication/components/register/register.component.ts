import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:string;
  password:string;
  email:string;
  constructor(private infoService: BudgetingInfoService, private router: Router) { }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  register():void {
    if (this.username.localeCompare('') !== 0 && this.password.localeCompare('') !== 0 && this.email.localeCompare('') !== 0) {
      let body = {
        username: this.username,
        password: this.password,
        email: this.email
      };
      fetch(`http://localhost:5000/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      }).then(() => {
        this.router.navigateByUrl('/authentication/login');
      });
    }
  }

  collectUsername(event): void {
    this.username = event.target.value;
  }
  collectPassword(event): void {
    this.password = event.target.value;
  }

  collectEmail(event): void {
    this.email = event.target.value;
  }
}
