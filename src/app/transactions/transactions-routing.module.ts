import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsMainComponent } from './components/transactions-main/transactions-main.component';

const routes: Routes = [
    {
      path: '',
      component: TransactionsMainComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TransactionsRoutingModule { }