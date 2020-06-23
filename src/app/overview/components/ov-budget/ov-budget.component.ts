import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ov-budget',
  templateUrl: './ov-budget.component.html',
  styleUrls: ['./ov-budget.component.css']
})
export class OvBudgetComponent implements OnInit {
  budget:string;
  remaining:string;
  limit:string;
  constructor() { }

  ngOnInit(): void {
    this.budget = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(10000);
    this.remaining = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(10023.03);
    this.limit = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(10023.03);
  }

}
