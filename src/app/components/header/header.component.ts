import { Component, OnInit } from '@angular/core';
import { BudgetingInfoService } from '../../state/budgeting-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accounts;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.accounts = this.infoService.getAccounts();
    setInterval(() => {
      this.accounts = this.infoService.getAccounts();
    }, 500);
  }

}
