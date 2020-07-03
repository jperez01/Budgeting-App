import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() item:any;
  date_string:string;
  outflow:number;
  inflow:number;
  changingValue:boolean;
  background:string;
  line:string;
  sentItem:boolean;
  newAccount:string;
  newDate:string;
  newCategory:string;
  newDescription:string;
  newInflow:number;
  newOutflow:number;
  styleChange:any;
  constructor() { }

  ngOnInit(): void {
    this.sentItem = false;
    this.background = '';
    this.line = '1px solid #b6bec2';
    this.changingValue = false;
    this.date_string = this.getFormattedDate(this.item.date);
    this.outflow = this.item.outflow.toFixed(2);
    this.inflow = this.item.inflow.toFixed(2);
    this.newAccount = this.item.account;
    this.newCategory = this.item.category;
    this.newDate = this.item.date;
    this.newInflow = this.inflow;
    this.newOutflow = this.outflow;
    this.newDescription = this.item.description;
  }

  confirmChanges(): void {
    if (this.newAccount !== undefined && this.newCategory !== undefined && this.newDate !== undefined
      && this.newDescription !== undefined && this.newInflow !== undefined && this.newOutflow !== undefined) {
        let newTransaction = {
          account: this.newAccount,
          date: new Date(this.newDate),
          category: this.newCategory,
          description: this.newDescription,
          outflow: Number(this.newOutflow),
          inflow: Number(this.newInflow)
        }
        this.newAccount = this.item.account;
        this.newCategory = this.item.category;
        this.newDate = this.item.date;
        this.newInflow = this.inflow;
        this.newOutflow = this.outflow;
        this.newDescription = this.item.description;
        this.changingValue = false;
        this.background = '';
        this.line = '1px solid #b6bec2';
      } else {
        console.log(this.newAccount);
        console.log(this.newCategory);
        console.log(this.newDate);
        console.log(this.newOutflow);
        console.log(this.newInflow);
        console.log(typeof this.newOutflow);
      }
  }

  cancelChange(): void {
    this.changingValue = false;
    this.background = '';
    this.line = '1px solid #b6bec2';
  }
  changeStyle(): void {
      this.background = '#0091d946';
      this.line = 'none';
      this.changingValue = true;
      console.log('Outer');
  }

  getFormattedDate(date: Date): string {
    let year = date.getFullYear();
  
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

  collectAccount(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newAccount = event.target.value;
    } else {
      this.newAccount = undefined;
    }
  }

  collectDate(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newDate = event.target.value;
    } else {
      this.newDate = undefined;
    }
  }

  collectCategory(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newCategory = event.target.value;
    } else {
      this.newCategory = undefined;
    }
  }

  collectDescription(event: any): void {
    if (event.target.value.localeCompare('') !== 0) {
      this.newDescription = event.target.value;
    } else {
      this.newDescription = undefined;
    }
  }

  collectOutflow(event: any): void {
    if (!isNaN(event.target.value % 1)) {
      this.newOutflow = event.target.value;
    } else {
      this.newOutflow = undefined;
    }
  }

  collectInflow(event: any): void {
    if (!isNaN(event.target.value % 1)) {
      this.newInflow = event.target.value;
    } else {
      this.newInflow = undefined;
    }
  }
}
