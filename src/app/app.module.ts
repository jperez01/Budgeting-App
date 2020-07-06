import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { OverviewModule } from './overview/overview.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { Settings } from './components/settings/settings.component';
import { HeaderAccountComponent } from './components/header-account/header-account.component';
import { StoreModule } from '@ngrx/store';
import { infoReducer } from './state/info.reducer';
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
    ChartsModule,
    OverviewModule,
    TransactionsModule,
    StoreModule.forRoot({info: reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
