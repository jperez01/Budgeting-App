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
    var ctx = document.getElementById('myChart');
    var myChart = new Chart('myChart', {
      type: 'line',
      data: {
          labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          datasets: [{
              label: 'Revenue',
              data: [12, 19, 3, 5, 2, 3, 20],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
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
                }
              }]
          },
          legend: {
            display: false
          }
      }
  });
  }

}
