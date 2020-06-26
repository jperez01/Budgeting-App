import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-ov-expenses',
  templateUrl: './ov-expenses.component.html',
  styleUrls: ['./ov-expenses.component.css']
})
export class OvExpensesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var ctx = document.getElementById('expenses');
    var myChart = new Chart('expenses', {
      type: 'line',
      data: {
          labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          datasets: [{
              label: 'Revenue',
              data: [12, 19, 3, 5, 2, 3, 20],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              pointBorderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2
          }]
      },
      options: {
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
            backgroundColor: 'rgba(235, 30, 74, 0.5)',
            callbacks: {
              title: function() {
                return '';
              },
              label: function(tooltipItem, data) {
                return '$' + data['datasets'][0]['data'][tooltipItem['index']];
              }
            },
            displayColors: false
          },
          layout: {
            padding: 5
          }
      }
  });
  }

}
