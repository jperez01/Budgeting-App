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
