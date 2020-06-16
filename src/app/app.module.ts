import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TransactionListComponent } from './components/overview/transaction-list/transaction-list.component';
import { TransactionItemComponent } from './components/overview/transaction-item/transaction-item.component';
import { AppRoutingModule } from './app-routing.module';
import { Settings } from './components/settings/settings.component';
import { OverviewMainComponent } from './components/overview/overview-main/overview-main.component';
import { OvCategoriesComponent } from './components/overview/ov-categories/ov-categories.component';
import { OvCategoryItemComponent } from './components/overview/ov-category-item/ov-category-item.component';
import { OvAccountsComponent } from './components/overview/ov-accounts/ov-accounts.component';
import { OvAccountComponent } from './components/overview/ov-account/ov-account.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OvBudgetComponent } from './components/overview/ov-budget/ov-budget.component';
import { OvExpensesComponent } from './components/overview/ov-expenses/ov-expenses.component';
import { OvRevenueComponent } from './components/overview/ov-revenue/ov-revenue.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionListComponent,
    TransactionItemComponent,
    Settings,
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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
