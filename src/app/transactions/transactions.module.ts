import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsMainComponent } from './components/transactions-main/transactions-main.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';


@NgModule({
  declarations: [TransactionsMainComponent, TransactionItemComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})

export class TransactionsModule { }
