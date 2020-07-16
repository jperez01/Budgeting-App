import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { BudgetingInfoService } from './state/budgeting-info.service';
import { OverviewModule } from './overview/overview.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CalendarModule} from './calendar/calendar.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { Settings } from './components/settings/settings.component';
import { HeaderAccountComponent } from './components/header-account/header-account.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/index';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Settings,
    HeaderAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ChartsModule,
    CalendarModule,
    OverviewModule,
    TransactionsModule,
    StoreModule.forRoot({info: reducer})
  ],
  providers: [BudgetingInfoService],
  bootstrap: [AppComponent, BudgetingInfoService]
})
export class AppModule { }
