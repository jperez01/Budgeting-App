import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetMainComponent } from './components/budget-main/budget-main.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetInfoComponent } from './components/budget-info/budget-info.component';
import { GroupComponent } from './components/group/group.component';
import { GroupItemComponent } from './components/group-item/group-item.component';


@NgModule({
  declarations: [BudgetMainComponent, BudgetInfoComponent, GroupComponent, GroupItemComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
