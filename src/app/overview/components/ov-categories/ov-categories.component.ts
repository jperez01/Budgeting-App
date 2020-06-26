import { Component, OnInit } from '@angular/core';
import Category from '../../models/category';
import Icons from '../../../shared/icons/icons';

@Component({
  selector: 'app-ov-categories',
  templateUrl: './ov-categories.component.html',
  styleUrls: ['./ov-categories.component.css']
})
export class OvCategoriesComponent implements OnInit {
  categories:Category[];
  icons:Icons;
  constructor() { }

  ngOnInit(): void {
    this.icons = new Icons();
    this.categories = [
      {
        url: this.icons.findIconImg(1),
        color: this.icons.findColor(1),
        name: "Food",
        amount: 0
      },
      {
        url: this.icons.findIconImg(2),
        color: this.icons.findColor(2),
        name: "Transportation",
        amount: 0
      },
      {
        url: this.icons.findIconImg(4),
        color: this.icons.findColor(4),
        name: "Utilities",
        amount: 20
      },
      {
        url: this.icons.findIconImg(3),
        color: this.icons.findColor(3),
        name: "Movies",
        amount: 200
      },
      {
        url: this.icons.findIconImg(0),
        color: this.icons.findColor(0),
        name: "Miscellaneous",
        amount: 20
      }
    ]
  }

}
