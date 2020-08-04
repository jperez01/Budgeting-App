import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Settings } from './components/settings/settings.component';
import { Routes, RouterModule } from '@angular/router';
import { InstructionsComponent } from './components/instructions/instructions.component';

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
    path: 'transactions/:id',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'instructions',
    component: InstructionsComponent
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
