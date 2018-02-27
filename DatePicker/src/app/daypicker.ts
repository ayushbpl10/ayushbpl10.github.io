import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {DatePickerInner} from './datepicker-inner';


@Component({
    selector: 'daypicker, [daypicker]',
    template: `
            <table [hidden]="datePicker.datepickerMode!=='day'" role="grid" aria-labelledby="uniqueId+'-title'" aria-activedescendant="activeDateId">
            <thead>
                <tr>
                <th>
                    <button type="button" class="btn-floating waves-effect waves-light red pull-left" (click)="datePicker.move(-1,$event)" tabindex="-1">
                <i class="material-icons">skip_previous</i>
                    </button>
                </th>
                <th [attr.colspan]="5 + datePicker.showWeeks"  class="center-align">
                    <strong>{{title}}</strong>
                    
                </th>
                <th>
                    <button type="button" class="btn-floating waves-effect waves-light red pull-right" (click)="datePicker.move(1,$event)" tabindex="-1">
                    <i class="material-icons">skip_next</i>
                    </button>
                </th>
                </tr>
                
                <tr>
                <th [hidden]="!datePicker.showWeeks"></th>
                <th *ngFor=" let labelz of labels" class="center-align"><small aria-label="labelz.full"><b>{{labelz.abbr}}</b></small></th>
                </tr>
                
            </thead>
            <tbody>
                <template ngFor [ngForOf]="rows" let-rowz="$implicit" let-index="index">
                <tr *ngIf="!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)">
                    
                      
                    <td *ngFor=" let dtz of rowz" class="center-align shiftselection" role="gridcell" [id]="dtz.uid">
                    <button type="button" style="max-width:100%;height:100%; background-color:white;" class="btn-floating"
                            *ngIf="!(datePicker.onlyCurrentMonth && dtz.secondary)"
                            [ngClass]="{'blue': dtz.current&&dtz.selected,'green': dtz.current&&!dtz.selected,'blue': dtz.selected}"
                            (click)="datePicker.select(dtz,$event)" tabindex="-1">
                        <span [ngClass]="{'black-text': dtz.secondary,'blue-text': !dtz.secondary,'white-text': dtz.selected||dtz.current }">{{dtz.label}}</span>
                    </button>
                    </td>
                </tr>
                </template>
            </tbody>
            </table>
  `,
  styles:[`
    td,th{
        padding: 4px;
    }
  `]
})
export class DayPicker implements OnInit {

    public labels:Array<any> = [];//the date that is shown in the datepicker which is in dateobject
    public title:string;//title of month
    public rows:Array<any> = [];//rows of month
    //public weekNumbers:Array<number> = [];

    constructor(public datePicker:DatePickerInner) {
    }


    private getDates(startDate:Date, n:number) {//returns Array of 42 days of a month view
        let dates:Array<Date> = new Array(n);
        let current = new Date(startDate.getTime());
        let i = 0;
        let date:Date;
        while (i < n) {
            date = new Date(current.getTime());
            this.datePicker.fixTimeZone(date);
            dates[i++] = date;
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }



    ngOnInit() {
        let self = this;

        this.datePicker.stepDay = {months: 1};

        this.datePicker.setRefreshViewHandler(function () {//refresh view on month change

            let year = this.activeDate.getFullYear();//get active date year
            let month = this.activeDate.getMonth();//get active date month
            let firstDayOfMonth = new Date(year, month, 1);// first day of month
            let difference = this.startingDay - firstDayOfMonth.getDay();//starting day as 0 therefore difference is 1
            let numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference;// previous month numbers
            let firstDate = new Date(firstDayOfMonth.getTime());// first date of month

            if (numDisplayedFromPreviousMonth > 0) {
                firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
            }

            // 42 is the number of days on a six-week calendar
            let _days:Array<Date> = self.getDates(firstDate, 42);
            let days:Array<any> = [];
            for (let i = 0; i < 42; i++) {
                let _dateObject = this.createDateObject(_days[i], this.formatDay);
                _dateObject.secondary = _days[i].getMonth() !== month;
                _dateObject.uid = this.uniqueId + '-' + i;
                days[i] = _dateObject;
            }

            self.labels = [];
            for (let j = 0; j < 7; j++) {
                self.labels[j] = {};
                self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
                self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
            }

            self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
            self.rows = this.split(days, 7);

        }, 'day');

        this.datePicker.setCompareHandler(function (date1:Date, date2:Date) {
            let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return d1.getTime() - d2.getTime();
        }, 'day');

        this.datePicker.refreshView();
    }


}
