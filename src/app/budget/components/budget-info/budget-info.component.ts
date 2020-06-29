import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css']
})
export class BudgetInfoComponent implements OnInit {
  @Input() groups;
  whole_budgeted:number;
  whole_received:number;
  whole_available:number;
  current_number:number;
  graph_labels:string[];
  graph_values:number[];
  budgeted:boolean;
  received:boolean;
  available:boolean;

  constructor() { 
    this.whole_budgeted = 0;
    this.whole_received = 0;
    this.whole_available = 0;
    this.graph_labels = [];
    this.graph_values = [];
    this.budgeted = true;
    this.available = false;
    this.received = false;
  }

  ngOnInit(): void {
    this.groups.forEach(group => {
      this.whole_budgeted += group.total_budgeted;
      this.whole_received += group.total_received;
      this.graph_labels.push(group.title);
      this.graph_values.push(group.total_budgeted);
    });
    this.whole_available = this.whole_budgeted - this.whole_received;
    this.current_number = this.whole_budgeted;
    var myChart = new Chart('GroupsChart', {
      type: 'pie',
      data: {
        labels: this.graph_labels,
        datasets: [{
          label: "Groups",
          backgroundColor: ["red", "green"],
          data: this.graph_values,
        }]
    },
    options: {
      cutoutPercentage: 80,
      legend: {
        display: false
      }
    }
    });
  }

  changeToBudgeted():void {
    this.groups.forEach(group => {
      this.graph_values.push(group.total_budgeted);
    });
    this.current_number = this.whole_budgeted;
    this.budgeted = true;
    this.available = false;
    this.received = false;
  }

  changeToReceived():void {
    this.graph_values = [];
    this.groups.forEach(group => {
      this.graph_values.push(group.total_received);
    });
    this.current_number = this.whole_received;
    this.budgeted = false;
    this.available = false;
    this.received = true;
    var myChart = new Chart('GroupsChart', {
      type: 'pie',
      data: {
        labels: this.graph_labels,
        datasets: [{
          label: "Groups",
          backgroundColor: ["red", "green"],
          data: this.graph_values,
        }]
    },
    options: {
      cutoutPercentage: 80,
      legend: {
        display: false
      }
    }
    });
  }

  changeToAvailable():void {
    this.graph_values = [];
    this.groups.forEach(group => {
      this.graph_values.push(group.total_budgeted + group.total_received);
    });
    this.current_number = this.whole_budgeted + this.whole_received;
    this.budgeted = false;
    this.available = true;
    this.received = false;
    var myChart = new Chart('GroupsChart', {
      type: 'pie',
      data: {
        labels: this.graph_labels,
        datasets: [{
          label: "Groups",
          backgroundColor: ["red", "green"],
          data: this.graph_values,
        }]
    },
    options: {
      cutoutPercentage: 80,
      legend: {
        display: false
      }
    }
    });
  }

  createPercentage(number, number2):string {
    let num = 100 * number / number2;
    return num.toFixed(2) + '%';
  }

  formatCurrency(number):string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }
}
