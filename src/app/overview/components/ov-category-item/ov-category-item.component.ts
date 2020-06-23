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
  constructor() { }

  ngOnInit(): void {
    this.cost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.category.amount);
  }

}
