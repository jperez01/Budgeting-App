import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetingInfoService } from './state/budgeting-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url:string;
  login_successful:boolean;
  constructor(public router: Router, private infoService: BudgetingInfoService) {
    this.url = router.url;
    this.login_successful = false;
    this.infoService.login_success.subscribe(value => {
      this.login_successful = value;
    })
  }
}
