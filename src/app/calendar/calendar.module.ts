import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMainComponent } from './components/calendar-main/calendar-main.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { ChartComponent } from './components/chart/chart.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';


@NgModule({
  declarations: [CalendarMainComponent, ChartComponent, CalendarComponent, CalendarDayComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
