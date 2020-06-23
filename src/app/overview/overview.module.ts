import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewRoutingModule } from './overview-routing.module';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { OverviewMainComponent } from './components/overview-main/overview-main.component';
import { OvCategoriesComponent } from './components/ov-categories/ov-categories.component';
import { OvCategoryItemComponent } from './components/ov-category-item/ov-category-item.component';
import { OvAccountsComponent } from './components/ov-accounts/ov-accounts.component';
import { OvAccountComponent } from './components/ov-account/ov-account.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OvBudgetComponent } from './components/ov-budget/ov-budget.component';
import { OvExpensesComponent } from './components/ov-expenses/ov-expenses.component';
import { OvRevenueComponent } from './components/ov-revenue/ov-revenue.component';


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionItemComponent,
    OverviewMainComponent,
    OvCategoriesComponent,
    OvCategoryItemComponent,
    OvAccountsComponent,
    OvAccountComponent,
    CalendarComponent,
    OvBudgetComponent,
    OvExpensesComponent,
    OvRevenueComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
