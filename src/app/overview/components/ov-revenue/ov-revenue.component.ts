import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-ov-revenue',
  templateUrl: './ov-revenue.component.html',
  styleUrls: ['./ov-revenue.component.css']
})
export class OvRevenueComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    var myChart = new Chart('myChart', {
      type: 'line',
      data: {
          labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          datasets: [{
              label: 'Revenue',
              data: [12, 19, 3, 5, 2, 3, 20],
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
                  fontFamily: "'Sofia Pro Light"
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
            bodyFontFamily: 'Sofia Pro Regular',
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
