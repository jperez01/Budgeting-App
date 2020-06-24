import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

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
    var myChart = new Chart('BudgetChart', {
      type: 'pie',
    data: {
      labels: ["Spent", "Remaining"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["red", "green"],
        data: [230430,5267]
      }]
    },
    options: {
      cutoutPercentage: 75,
      legend: {
        display: false
      }
    }
    })

  }

}
