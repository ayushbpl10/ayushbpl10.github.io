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
                    <button type="button" class="btn btn-info btn-secondary btn-sm pull-left" (click)="datePicker.move(-1,$event)" tabindex="-1">
                <i class="glyphicon glyphicon-chevron-left"></i>
                    </button>
                </th>
                <th [attr.colspan]="5 + datePicker.showWeeks"  class="text-center">
                    <!--<input [id]="datePicker.uniqueId + '-title'"
                            type="button" class=""
                            [disabled]="false"
                            readonly="true"
                            [ngClass]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
                    -->
                    <strong>{{title}}</strong>
                    
                </th>
                <th>
                    <button type="button" class="btn btn-info btn-secondary btn-sm pull-right" (click)="datePicker.move(1,$event)" tabindex="-1">
                    <i class="glyphicon glyphicon-chevron-right"></i>
                    </button>
                </th>
                </tr>
                <!--
                <tr>
                <th [hidden]="!datePicker.showWeeks"></th>
                <th *ngFor=" let labelz of labels" class="text-center"><small aria-label="labelz.full"><b>{{labelz.abbr}}</b></small></th>
                </tr>
                -->
            </thead>
            <tbody>
                <template ngFor [ngForOf]="rows" let-rowz="$implicit" let-index="index">
                <tr *ngIf="!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)">
                    <!-- <td [hidden]="!datePicker.showWeeks" class="text-center h6"><em>{{ weekNumbers[index] }}</em></td> -->
                    <!--  [ngClass]="dtz.customClass" -->
                    <td *ngFor=" let dtz of rowz" class="text-center shiftselection" role="gridcell" [id]="dtz.uid">
                    <button type="button" style="min-width:100%;" class="btn btn-default btn-sm"
                            *ngIf="!(datePicker.onlyCurrentMonth && dtz.secondary)"
                            [ngClass]="{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}"
                            [disabled]="dtz.disabled"
                            (click)="datePicker.select(dtz,$event)" tabindex="-1">
                        <span [ngClass]="{'text-muted': dtz.secondary, 'text-info': dtz.current}">{{dtz.label}}</span>
                    </button>
                    </td>
                </tr>
                </template>
            </tbody>
            </table>
  `
})
export class DayPicker implements OnInit {

    public labels:Array<any> = [];//the date tha is shown in the datepicker which is in dateobject
    public title:string;
    public rows:Array<any> = [];
    public weekNumbers:Array<number> = [];

    constructor(public datePicker:DatePickerInner) {
    }


    private getDates(startDate:Date, n:number) {
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

    private getISO8601WeekNumber(date:Date):number {
        let checkDate = new Date(date.getTime());
        // Thursday
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        let time = checkDate.getTime();
        // Compare with Jan 
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }

    ngOnInit() {
        let self = this;

        this.datePicker.stepDay = {months: 1};

        this.datePicker.setRefreshViewHandler(function () {
            let year = this.activeDate.getFullYear();
            let month = this.activeDate.getMonth();
            let firstDayOfMonth = new Date(year, month, 1);
            let difference = this.startingDay - firstDayOfMonth.getDay();
            let numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference;
            let firstDate = new Date(firstDayOfMonth.getTime());

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

            // if (this.showWeeks) {
            //     self.weekNumbers = [];
            //     let thursdayIndex = (4 + 7 - this.startingDay) % 7,
            //         numWeeks = self.rows.length;
            //     for (let curWeek = 0; curWeek < numWeeks; curWeek++) {
            //         self.weekNumbers.push(self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date));
            //     }
            // }
        }, 'day');

        this.datePicker.setCompareHandler(function (date1:Date, date2:Date) {
            let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return d1.getTime() - d2.getTime();
        }, 'day');

        this.datePicker.refreshView();
    }

    // todo: key events implementation
}
