"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var datepicker_inner_1 = require('./datepicker-inner');
var DayPicker = (function () {
    //public weekNumbers:Array<number> = [];
    function DayPicker(datePicker) {
        this.datePicker = datePicker;
        this.labels = []; //the date that is shown in the datepicker which is in dateobject
        this.rows = []; //rows of month
    }
    DayPicker.prototype.getDates = function (startDate, n) {
        var dates = new Array(n);
        var current = new Date(startDate.getTime());
        var i = 0;
        var date;
        while (i < n) {
            date = new Date(current.getTime());
            this.datePicker.fixTimeZone(date);
            dates[i++] = date;
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };
    DayPicker.prototype.ngOnInit = function () {
        var self = this;
        this.datePicker.stepDay = { months: 1 };
        this.datePicker.setRefreshViewHandler(function () {
            var year = this.activeDate.getFullYear(); //get active date year
            var month = this.activeDate.getMonth(); //get active date month
            var firstDayOfMonth = new Date(year, month, 1); // first day of month
            var difference = this.startingDay - firstDayOfMonth.getDay(); //starting day as 0 therefore difference is 1
            var numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference; // previous month numbers
            var firstDate = new Date(firstDayOfMonth.getTime()); // first date of month
            if (numDisplayedFromPreviousMonth > 0) {
                firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
            }
            // 42 is the number of days on a six-week calendar
            var _days = self.getDates(firstDate, 42);
            var days = [];
            for (var i = 0; i < 42; i++) {
                var _dateObject = this.createDateObject(_days[i], this.formatDay);
                _dateObject.secondary = _days[i].getMonth() !== month;
                _dateObject.uid = this.uniqueId + '-' + i;
                days[i] = _dateObject;
            }
            self.labels = [];
            for (var j = 0; j < 7; j++) {
                self.labels[j] = {};
                self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
                self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
            }
            self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
            self.rows = this.split(days, 7);
        }, 'day');
        this.datePicker.setCompareHandler(function (date1, date2) {
            var d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            var d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return d1.getTime() - d2.getTime();
        }, 'day');
        this.datePicker.refreshView();
    };
    DayPicker = __decorate([
        core_1.Component({
            selector: 'daypicker, [daypicker]',
            template: "\n            <table [hidden]=\"datePicker.datepickerMode!=='day'\" role=\"grid\" aria-labelledby=\"uniqueId+'-title'\" aria-activedescendant=\"activeDateId\">\n            <thead>\n                <tr>\n                <th>\n                    <button type=\"button\" class=\"btn-floating waves-effect waves-light red pull-left\" (click)=\"datePicker.move(-1,$event)\" tabindex=\"-1\">\n                <i class=\"material-icons\">skip_previous</i>\n                    </button>\n                </th>\n                <th [attr.colspan]=\"5 + datePicker.showWeeks\"  class=\"center-align\">\n                    <strong>{{title}}</strong>\n                    \n                </th>\n                <th>\n                    <button type=\"button\" class=\"btn-floating waves-effect waves-light red pull-right\" (click)=\"datePicker.move(1,$event)\" tabindex=\"-1\">\n                    <i class=\"material-icons\">skip_next</i>\n                    </button>\n                </th>\n                </tr>\n                \n                <tr>\n                <th [hidden]=\"!datePicker.showWeeks\"></th>\n                <th *ngFor=\" let labelz of labels\" class=\"center-align\"><small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small></th>\n                </tr>\n                \n            </thead>\n            <tbody>\n                <template ngFor [ngForOf]=\"rows\" let-rowz=\"$implicit\" let-index=\"index\">\n                <tr *ngIf=\"!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)\">\n                    \n                      \n                    <td *ngFor=\" let dtz of rowz\" class=\"center-align shiftselection\" role=\"gridcell\" [id]=\"dtz.uid\">\n                    <button type=\"button\" style=\"max-width:100%;height:100%; background-color:white;\" class=\"btn-floating\"\n                            *ngIf=\"!(datePicker.onlyCurrentMonth && dtz.secondary)\"\n                            [ngClass]=\"{'blue': dtz.current&&dtz.selected,'green': dtz.current&&!dtz.selected,'blue': dtz.selected}\"\n                            (click)=\"datePicker.select(dtz,$event)\" tabindex=\"-1\">\n                        <span [ngClass]=\"{'black-text': dtz.secondary,'blue-text': !dtz.secondary,'white-text': dtz.selected||dtz.current }\">{{dtz.label}}</span>\n                    </button>\n                    </td>\n                </tr>\n                </template>\n            </tbody>\n            </table>\n  ",
            styles: ["\n    td,th{\n        padding: 4px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [datepicker_inner_1.DatePickerInner])
    ], DayPicker);
    return DayPicker;
}());
exports.DayPicker = DayPicker;
//# sourceMappingURL=daypicker.js.map