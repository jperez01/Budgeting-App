import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:string;
  password:string;
  email:string;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  register():void {
    console.log(this.username);
    console.log(this.password);
    console.log(this.email);
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
