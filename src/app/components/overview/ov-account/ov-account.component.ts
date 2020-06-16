import { Component, OnInit, Input } from '@angular/core';
import Account from '../../../models/account';

@Component({
  selector: 'app-ov-account',
  templateUrl: './ov-account.component.html',
  styleUrls: ['./ov-account.component.css']
})
export class OvAccountComponent implements OnInit {
  @Input() account: Account;
  constructor() { }

  ngOnInit(): void {
  }

}
