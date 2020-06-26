import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Settings } from './components/settings/settings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'settings', component: Settings },
  { path: 'overview',
    loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
  },
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
