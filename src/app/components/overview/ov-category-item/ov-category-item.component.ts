import { Component, OnInit, Input} from '@angular/core';
import Category from '../../../models/category';

@Component({
  selector: 'app-ov-category-item',
  templateUrl: './ov-category-item.component.html',
  styleUrls: ['./ov-category-item.component.css']
})
export class OvCategoryItemComponent implements OnInit {
  @Input() category: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
