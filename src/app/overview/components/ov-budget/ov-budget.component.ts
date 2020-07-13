import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-ov-budget',
  templateUrl: './ov-budget.component.html',
  styleUrls: ['./ov-budget.component.css']
})
export class OvBudgetComponent implements OnInit {
  budgetInfo:any[];
  budgeted:number;
  received:number;
  available:number;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.budgetInfo = this.infoService.getBudget();
    this.budgeted = 0;
    this.received = 0;
    this.available = 0;
    this.calculateTotals();
    this.createChart();
  }

  formatMoney(number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }

  calculateTotals(): void {
    this.budgetInfo.forEach(group => {
      this.budgeted += group.total_budgeted;
      this.received += group.total_received;
    })
    this.available = this.budgeted - this.received;
  }

  createChart(): void {
    var myChart = new Chart('BudgetChart', {
      type: 'pie',
    data: {
      labels: ["Used", "Available"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["red", "green"],
        data: [this.received, this.available]
      }]
    },
    options: {
      cutoutPercentage: 75,
      legend: {
        display: false
      }
    }
    });
  }
}
