import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() currentTransaction:any;
  @Input() allTransactions:any[];
  graph_labels:string[];
  outflow_values:number[];
  inflow_values:number[];
  lookingAtInflow:boolean;
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.lookingAtInflow = false;
    this.graph_labels = [];
    this.inflow_values = [];
    this.outflow_values = [];
    this.collectValuesAndNames();
    this.createGraph(this.outflow_values);
  }

  collectValuesAndNames(): void {
    this.allTransactions.forEach(transaction => {
      this.outflow_values.push(transaction.outflow);
      this.inflow_values.push(transaction.inflow);
      this.graph_labels.push(transaction.description);
    })
  }

  formatMoney(value: any): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  changeToOutflow(): void {
    if (this.lookingAtInflow === true) {
      this.createGraph(this.outflow_values);
      this.lookingAtInflow = false;
    }
  }

  changeToInflow(): void {
    if (this.lookingAtInflow === false) {
      this.createGraph(this.inflow_values);
      this.lookingAtInflow = true;
    }
  }

  createGraph(values): void {
    var newChart = new Chart('GroupChart', {
      type: 'pie',
      data: {
        labels: this.graph_labels,
        datasets: [{
          label: "Groups",
          backgroundColor: ["red", "green"],
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
