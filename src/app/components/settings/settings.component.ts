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
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    let info = this.infoService.getLoginInfo();
    this.email = info.email;
    this.username = info.username;
    this.password = info.password;
  }

}
