import { Component, OnInit } from '@angular/core';
import Category from '../../models/category';
import Icons from '../../../shared/icons/icons';
import { BudgetingInfoService } from '../../../state/budgeting-info.service';

@Component({
  selector: 'app-ov-categories',
  templateUrl: './ov-categories.component.html',
  styleUrls: ['./ov-categories.component.css']
})
export class OvCategoriesComponent implements OnInit {
  budgetInfo:any[];
  categories:Category[];
  icons:Icons;
  constructor(private infoService: BudgetingInfoService) { }

  ngOnInit(): void {
    this.budgetInfo = this.infoService.getBudget();
    this.icons = new Icons();
    this.categories = [];
    let index = 0;
    this.budgetInfo.forEach(group => {
      let category = {
        url: this.icons.findIconImg(index),
        color: this.icons.findColor(index),
        name: group.title,
        amount: group.total_budgeted - group.total_received
      }
      this.categories.push(category);
      index++;
    })
  }

}
