import { Component, OnInit, Input} from '@angular/core';
import Category from '../../models/category';

@Component({
  selector: 'app-ov-category-item',
  templateUrl: './ov-category-item.component.html',
  styleUrls: ['./ov-category-item.component.css']
})
export class OvCategoryItemComponent implements OnInit {
  @Input() category: Category;
  cost:string;
  allItems:string;
  color:string;
  constructor() { }

  ngOnInit(): void {
    this.cost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.category.amount);
    this.createItemString();
    this.checkBalance();
  }

  checkBalance(): void {
    if (this.category.amount > 0) {
      this.color = 'green';
    } else if (this.category.amount < 0) {
      this.color = 'red';
    } else {
      this.color = 'black';
    }
  }

  createItemString(): void {
    this.allItems = '';
    let index = 0;
    if (this.category.items.length <= 3) {
      this.category.items.forEach(item => {
        if (index === this.category.items.length - 1) {
          this.allItems = this.allItems + item;
        } else {
          this.allItems = this.allItems + item + ', ';
        }
        index++;
      });
    } else {
      for (let i = 0; i < 3; i++) {
        this.allItems = this.allItems + this.category.items[i] + ', ';
      }
      this.allItems = this.allItems + 'more';
    }
  }
}
