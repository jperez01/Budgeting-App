import { Component, OnInit, Input, OnChanges} from '@angular/core';
import * as Chart from 'chart.js';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

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
  current_type:string;
  graph_labels:string[];
  graph_values:number[];
  graph_colors:string[];
  budgeted:boolean;
  received:boolean;
  available:boolean;

  USED_COLOR_STATER = 'hsl(0, 100%,';
  BUDGETED_COLOR_STARTER = 'hsl(120, 60%,';
  AVAILABLE_COLOR_STARTER = 'hsl(225, 100%,';

  constructor(private infoService: BudgetingInfoService) { 
    this.graph_labels = [];
    this.graph_values = [];
    this.graph_colors = [];
    this.budgeted = true;
    this.available = false;
    this.received = false;
    this.current_type = 'budgeted';
  }

  ngOnInit(): void {
    this.whole_budgeted = 0;
    this.whole_received = 0;
    this.whole_available = 0;
    this.graph_values = [];
    this.groups.forEach(group => {
      this.whole_budgeted += Number(group.total_budgeted);
      this.whole_received += Number(group.total_received);
      this.graph_labels.push(group.title);
      this.graph_values.push(group.total_budgeted);
    });
    this.whole_available = this.whole_budgeted - this.whole_received;
    this.current_number = this.whole_budgeted;
    this.getRandomColors(this.BUDGETED_COLOR_STARTER);
    this.infoService.emit_budget.subscribe(budget => {
      this.groups = budget;
      this.createInfo();
    });
    this.createGraph();
  }

  createInfo(): void {
    this.whole_budgeted = 0;
    this.whole_received = 0;
    this.whole_available = 0;
    this.graph_values = [];
    if (this.current_type.localeCompare('budgeted') === 0) {
      this.groups.forEach(group => {
        this.whole_budgeted += group.total_budgeted;
        this.whole_received += group.total_received;
        this.graph_labels.push(group.title);
        this.graph_values.push(group.total_budgeted);
      });
      this.whole_available = this.whole_budgeted - this.whole_received;
      this.current_number = this.whole_budgeted;
      this.getRandomColors(this.BUDGETED_COLOR_STARTER);
    } else if (this.current_type.localeCompare('received') === 0) {
      this.groups.forEach(group => {
        this.whole_budgeted += group.total_budgeted;
        this.whole_received += group.total_received;
        this.graph_labels.push(group.title);
        this.graph_values.push(group.total_received);
      });
      this.whole_available = this.whole_budgeted - this.whole_received;
      this.current_number = this.whole_received;
      this.getRandomColors(this.USED_COLOR_STATER);
    } else {
      this.groups.forEach(group => {
        this.whole_budgeted += group.total_budgeted;
        this.whole_received += group.total_received;
        this.graph_labels.push(group.title);
        this.graph_values.push(group.total_budgeted - group.total_received);
      });
      this.whole_available = this.whole_budgeted - this.whole_received;
      this.current_number = this.whole_available;
      this.getRandomColors(this.AVAILABLE_COLOR_STARTER);
    }
    this.createGraph();
  }

  getRandomColors(starter):void {
    let times = this.graph_values.length;
    let changing_value = 10;
    this.graph_colors = [];
    for (let i = 0; i < times; i++) {
      this.graph_colors.push(starter + (20 + changing_value) + '%)');
      changing_value += 10;
    }
  }

  changeToBudgeted():void {
    this.graph_values = [];
    this.groups.forEach(group => {
      this.graph_values.push(group.total_budgeted);
    });
    this.current_type = 'budgeted';
    this.current_number = this.whole_budgeted;
    this.budgeted = true;
    this.available = false;
    this.received = false;
    this.getRandomColors(this.BUDGETED_COLOR_STARTER);
    this.createGraph();
  }

  changeToReceived():void {
    this.graph_values = [];
    this.groups.forEach(group => {
      this.graph_values.push(group.total_received);
    });
    this.current_number = this.whole_received;
    this.current_type = 'received';
    this.budgeted = false;
    this.available = false;
    this.received = true;
    this.getRandomColors(this.USED_COLOR_STATER);
    this.createGraph();
  }

  changeToAvailable():void {
    this.graph_values = [];
    this.groups.forEach(group => {
      this.graph_values.push(group.total_budgeted - group.total_received);
    });
    this.current_number = this.whole_budgeted - this.whole_received;
    this.current_type = 'available';
    this.budgeted = false;
    this.available = true;
    this.received = false;
    this.getRandomColors(this.AVAILABLE_COLOR_STARTER);
    this.createGraph();
  }

  createGraph(): void {
    var myChart = new Chart('GroupsChart', {
      type: 'pie',
      data: {
        labels: this.graph_labels,
        datasets: [{
          label: "Groups",
          backgroundColor: this.graph_colors,
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
    let num = 100 * Math.abs(number) / Math.abs(number2);
    return num.toFixed(2) + '%';
  }

  formatCurrency(number):string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }
}
