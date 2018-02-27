import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import{ DatePickerInner } from './datepicker-inner';
import{ DatePicker } from './datepicker';
import{ DayPicker } from './daypicker';


import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule,FormsModule ],
  declarations: [ AppComponent,DatePicker,DatePickerInner,DayPicker],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
