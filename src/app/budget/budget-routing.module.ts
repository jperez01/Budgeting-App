import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetMainComponent } from './components/budget-main/budget-main.component';


const routes: Routes = [
  {
    path: '',
    component: BudgetMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }