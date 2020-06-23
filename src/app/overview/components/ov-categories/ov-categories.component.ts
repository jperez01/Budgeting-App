import { Component, OnInit } from '@angular/core';
import Category from '../../models/category';

@Component({
  selector: 'app-ov-categories',
  templateUrl: './ov-categories.component.html',
  styleUrls: ['./ov-categories.component.css']
})
export class OvCategoriesComponent implements OnInit {
  categories:Category[];
  constructor() { }

  ngOnInit(): void {
    this.categories = [
      {
        url: "",
        name: "Food",
        amount: 0
      },
      {
        url: "",
        name: "Transportation",
        amount: 0
      }
    ]
  }

}
