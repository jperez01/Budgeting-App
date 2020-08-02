import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsMainComponent } from './components/transactions-main/transactions-main.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransDatePickerComponent } from './components/trans-date-picker/trans-date-picker.component';


@NgModule({
  declarations: [TransactionsMainComponent, TransactionItemComponent, TransDatePickerComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})

export class TransactionsModule { }
