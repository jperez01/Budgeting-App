import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import DateInfo from '../../../shared/date/dateInfo';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-ov-revenue',
  templateUrl: './ov-revenue.component.html',
  styleUrls: ['./ov-revenue.component.css']
})
export class OvRevenueComponent implements OnInit {
  info:DateInfo;
  filtered_trans:any[];
  chart_values:number[];
  current_date:number;
  current_weekday:number;
  start_of_week:number;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.info = new DateInfo();
    this.current_date = this.info.getCurrentDay();
    this.current_weekday = this.info.getWeekday();
    this.start_of_week = this.current_date - this.current_weekday;
    this.chart_values = [0, 0, 0, 0, 0, 0, 0];
    this.filterTransactions();
    this.findChartValues();
    this.createGraph();
  }

  findChartValues(): void {
    this.filtered_trans.forEach(transaction => {
      this.chart_values[transaction.date.getDate() - this.start_of_week] += Number(transaction.inflow);
    })
  }

  findStartAndEndDates(): any[] {
    let min_date = new Date(this.info.getYear(), this.info.getMonth(), this.start_of_week);
    let max_date = new Date(this.info.getYear(), this.info.getMonth(), this.start_of_week + 6);
    return [min_date, max_date];
  }

  filterTransactions(): void {
    this.filtered_trans = [];
    let transactions = this.infoService.getTransactions();
    let dates = this.findStartAndEndDates();
    let min_date = dates[0];
    let max_date = dates[1];
    transactions.forEach(transaction => {
      if (this.info.inRange(transaction.date, min_date, max_date)) {
        this.filtered_trans.push(transaction);
      }
    });
  }

  createGraph(): void {
    var myChart = new Chart('myChart', {
      type: 'line',
      data: {
          labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          datasets: [{
              label: 'Revenue',
              data: this.chart_values,
              backgroundColor: [
                  '#cff0e7'
              ],
              borderColor: [
                  'green'
              ],
              pointBorderColor: 'green',
              borderWidth: 2
          }]
      },
      options: {
          layout: {
            padding: 5
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  },
                  display: false
              }],
              xAxes: [{
                ticks: {
                  fontFamily: "'Proxima Nova Regular"
                },
                gridLines: {
                  display: false
                }
              }]
          },
          legend: {
            display: false
          },
          tooltips: {
            bodyFontFamily: 'Proxima Nova Regular',
            bodyFontSize: 16,
            backgroundColor: '#0bdba3',
            callbacks: {
              title: function() {
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
