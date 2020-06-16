import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Settings } from './components/settings/settings.component';
import { OverviewMainComponent } from './components/overview/overview-main/overview-main.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'settings', component: Settings },
  { path: 'overview', component: OverviewMainComponent }
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
