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
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InstructionsComponent } from './components/instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Settings,
    HeaderAccountComponent,
    WelcomeComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ChartsModule,
    CalendarModule,
    OverviewModule,
    TransactionsModule
  ],
  providers: [BudgetingInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
