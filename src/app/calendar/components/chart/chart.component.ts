import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() currentTransaction:any;
  @Input() allTransactions:any[];
  color_outflow:string[];
  color_inflow:string[];
  graph_labels:string[];
  outflow_values:number[];
  inflow_values:number[];
  total_outflow:number;
  total_inflow:number;
  current_total:number;
  lookingAtInflow:boolean;
  constructor(private elementRef: ElementRef, private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.lookingAtInflow = false;
    this.graph_labels = [];
    this.inflow_values = [];
    this.outflow_values = [];
    this.color_outflow = [];
    this.color_inflow = [];
    this.collectValuesAndNames();
    this.getRandomColorInflow();
    this.getRandomColorOutflow();
    this.createGraph(this.outflow_values, this.color_outflow);
    this.current_total = this.total_outflow;
    this.infoService.filtered_transactions.subscribe(transactions => {
      this.allTransactions = transactions;
      this.graph_labels = [];
      this.inflow_values = [];
      this.outflow_values = [];
      this.collectValuesAndNames();
      this.getRandomColorInflow();
      this.getRandomColorOutflow();
      this.createGraph(this.outflow_values, this.color_outflow);
    })
  }

  collectValuesAndNames(): void {
    this.total_inflow = 0;
    this.total_outflow = 0;
    this.allTransactions.forEach(transaction => {
      this.total_inflow += Number(transaction.inflow);
      this.total_outflow += Number(transaction.outflow);
      this.outflow_values.push(transaction.outflow);
      this.inflow_values.push(transaction.inflow);
      this.graph_labels.push(transaction.description);
    });
  };

  formatMoney(value: any): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  changeToOutflow(): void {
    if (this.lookingAtInflow === true) {
      this.createGraph(this.outflow_values, this.color_outflow);
      this.lookingAtInflow = false;
      this.current_total = this.total_outflow;
    }
  }

  changeToInflow(): void {
    if (this.lookingAtInflow === false) {
      this.createGraph(this.inflow_values, this.color_inflow);
      this.lookingAtInflow = true;
      this.current_total = this.total_inflow;
    }
  }

  getRandomColorOutflow():void {
    let times = this.outflow_values.length;
    let starter = 'hsl(0, 100%,';
    let changing_value = 10;
    this.color_outflow = [];
    for (let i = 0; i < times; i++) {
      this.color_outflow.push(starter + (20 + changing_value) + '%)');
      changing_value += 5;
    }
  }

  getRandomColorInflow(): void {
    let times = this.inflow_values.length;
    let starter = 'hsl(120, 60%,';
    let changing_value = 10;
    this.color_inflow = [];
    for (let i = 0; i < times; i++) {
      this.color_inflow.push(starter + (10 + changing_value) + '%)');
      changing_value += 5;
    }
  }

  createGraph(values, colors): void {
    var newChart = new Chart('GroupChart', {
      type: 'pie',
      data: {
        labels: this.graph_labels,
        datasets: [{
          label: "Groups",
          backgroundColor: colors,
          data: values,
        }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 80,
      legend: {
        display: false
      }
    }
    });
  }
}
