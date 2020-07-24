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
      this.budgeted += Number(group.total_budgeted);
      this.received += Number(group.total_received);
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
        backgroundColor: ["rgb(255, 0, 0)", "rgb(31, 122, 31)"],
        data: [this.received, this.available]
      }]
    },
    options: {
      cutoutPercentage: 80,
      legend: {
        display: false
      },
      tooltips: {
        bodyFontFamily: 'Proxima Nova Regular',
        bodyFontSize: 16,
        backgroundColor: '#4b525a',
        callbacks: {
          labelColor: function(tooltipItem, chart) {
            let info = chart.data.datasets[0]['backgroundColor'][tooltipItem.datasetIndex];
            return {
              backgroundColor: info,
              borderColor: ''
            }
          },
          title: function(tooltipItem, data) {
            return '';
          },
          label: function(tooltipItem, data) {
            return '$' + data['datasets'][0]['data'][tooltipItem['index']];
          }
        },
        displayColors: false
      }
    }
    });
  }
}
