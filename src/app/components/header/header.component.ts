import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accounts;
  constructor() { }

  ngOnInit(): void {
    this.accounts = [
      {
        name: 'American Express',
        balance: 1000
      },
      {
        name: 'John Savings',
        balance: -1000
      }
    ]
  }

}
