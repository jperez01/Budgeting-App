import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewMainComponent } from './components/overview-main/overview-main.component';


const routes: Routes = [
  {
    path: '',
    component: OverviewMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }