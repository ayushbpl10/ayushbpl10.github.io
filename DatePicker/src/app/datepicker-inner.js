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
var moment_date_formatter_1 = require('./moment-date-formatter');
var FORMAT_DAY = 'DD';
var FORMAT_MONTH = 'MMMM';
var FORMAT_YEAR = 'YYYY';
var FORMAT_DAY_HEADER = 'dd';
var FORMAT_DAY_TITLE = 'MMMM YYYY';
var FORMAT_MONTH_TITLE = 'YYYY';
var DATEPICKER_MODE = 'day';
var STARTING_DAY = 0;
var YEAR_RANGE = 20;
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var KEYS = {
    13: 'enter',
    32: 'space',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
var DatePickerInner = (function () {
    function DatePickerInner() {
        this.stepDay = {};
        this.stepMonth = {};
        this.stepYear = {};
        this.modes = ['day', 'month', 'year'];
        this.dateFormatter = new moment_date_formatter_1.DateFormatter();
        //@Output() private update:EventEmitter<Date> = new EventEmitter();
        //Event by Ayush
        this.updatemultiple = new core_1.EventEmitter();
        //For shift key by Ayush
        this.range = []; //array for range selection
        this.single = []; //array for single selection
        //Array by Ayush
        this.multiple = []; //Array for multiple dates selection
    }
    Object.defineProperty(DatePickerInner.prototype, "activeDate", {
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            this._activeDate = value;
            if (this.range.length != 1 && this.multiple.length != 1) {
                this.range.push(moment(this._activeDate).startOf('day').toDate());
                this.multiple.push(moment(this._activeDate).startOf('day').toDate());
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerInner.prototype.ngOnInit = function () {
        this.formatDay = FORMAT_DAY;
        this.formatMonth = FORMAT_MONTH;
        this.formatYear = FORMAT_YEAR;
        this.formatDayHeader = FORMAT_DAY_HEADER;
        this.formatDayTitle = FORMAT_DAY_TITLE;
        this.formatMonthTitle = FORMAT_MONTH_TITLE;
        this.startingDay = STARTING_DAY;
        this.yearRange = YEAR_RANGE;
        this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
        this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);
        this.activeDate = new Date();
        this.selectedDate = null; //No selected date
        this.refreshView();
    };
    DatePickerInner.prototype.clear = function () {
        this.multiple.splice(0);
        this.range.splice(0);
        this.single.splice(0);
        this.ngOnInit();
        this.updatemultiple.emit(this.single);
    };
    DatePickerInner.prototype.setCompareHandler = function (handler, type) {
        this.compareHandlerDay = handler;
    };
    DatePickerInner.prototype.compare = function (date1, date2) {
        if (this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }
        return null;
    };
    DatePickerInner.prototype.setRefreshViewHandler = function (handler, type) {
        this.refreshViewHandlerDay = handler;
    };
    DatePickerInner.prototype.refreshView = function () {
        if (this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }
    };
    DatePickerInner.prototype.dateFilter = function (date, format) {
        return this.dateFormatter.format(date, format);
    };
    DatePickerInner.prototype.createDateObject = function (date, format) {
        this.format = format; //format added by Ayush for checking if the date has already been selected by checking array
        var dateObject = {};
        dateObject.date = date;
        dateObject.label = this.dateFilter(date, format);
        var that = this;
        console.log("create");
        if (this.selectedDate == null) {
            dateObject.selected = false;
        }
        else {
            dateObject.selected = this.compare(date, this.selectedDate) === 0;
        }
        if (this.range.length > 0) {
            var that_1 = this;
            this.range.forEach(function (value, index) {
                if (date.getTime() == value.getTime()) {
                    dateObject.selected = true;
                    return false;
                }
            });
        }
        else if (this.multiple.length > 0) {
            var that_2 = this;
            this.multiple.forEach(function (value, index) {
                if (date.getTime() == value.getTime()) {
                    dateObject.selected = true;
                    return false;
                }
            });
        }
        dateObject.current = this.compare(date, new Date()) === 0;
        if (dateObject.current == true && this.selectedDate == null) {
            dateObject.selected = false;
        }
        return dateObject;
    };
    DatePickerInner.prototype.split = function (arr, size) {
        var arrays = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    };
    DatePickerInner.prototype.fixTimeZone = function (date) {
        var hours = date.getHours();
        date.setHours(hours === 23 ? hours + 2 : 0);
    };
    DatePickerInner.prototype.select = function (dateObj, event) {
        if (!this.activeDate) {
            this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
        }
        this.activeDate.setFullYear(dateObj.date.getFullYear(), dateObj.date.getMonth(), dateObj.date.getDate());
        if (event.ctrlKey == true) {
            if (this.range.length != 1) {
                this.multiple = this.multiple.concat(this.range);
                this.range.splice(0);
            }
            if (this.selectedDate == null) {
                this.multiple.splice(0);
            }
            dateObj.selected = true; //setting selected to true which attaches class btn-info
            this.selectedDate = new Date(this.activeDate.valueOf()); //getting the date
            var that_3 = this;
            this.multiple.forEach(function (value, index) {
                if (moment(that_3.selectedDate).startOf('day').toDate().getTime() == value.getTime()) {
                    console.log("matched");
                    dateObj.selected = false; //setting selected to false
                    that_3.multiple.splice(index, 1); //removing element whichwas already selected
                    that_3.updatemultiple.emit(that_3.multiple); //emitting array
                }
            });
            if (dateObj.selected) {
                var date = moment(this.selectedDate).startOf('day');
                this.multiple.push(date.toDate());
                this.updatemultiple.emit(this.multiple); //emitting array if there's a new element
            }
        }
        else if (event.shiftKey == true) {
            if (this.multiple.length != 0) {
                this.firstend = this.multiple.pop();
            }
            this.multiple.splice(0);
            dateObj.selected = true; //setting selected to true which attaches class btn-info
            this.selectedDate = new Date(this.activeDate.valueOf()); //getting the date
            if (this.lastend == null) {
                //this.EndTarget = this.TargetElm;//End Target to traverse the Domo decided
                this.lastend = this.selectedDate;
                console.log("lastend");
                var firstDate = moment(this.firstend).startOf('day');
                var lastDate = moment(this.lastend).startOf('day');
                if (firstDate.isAfter(lastDate)) {
                    if (this.range.length != 0) {
                        this.range.splice(0);
                    }
                    this.range.push(firstDate.toDate());
                    while (firstDate.subtract(1, 'days').diff(lastDate) >= 0) {
                        this.range.push(firstDate.toDate());
                    }
                }
                else if (firstDate.isBefore(lastDate)) {
                    if (this.range.length != 0) {
                        this.range.splice(0);
                    }
                    this.range.push(firstDate.toDate());
                    while (firstDate.add(1, 'days').diff(lastDate) <= 0) {
                        this.range.push(firstDate.toDate());
                    }
                }
                this.updatemultiple.emit(this.range); //emitting array if range is selected
                this.lastend = null;
                this.refreshView();
            }
        }
        else {
            this.multiple.splice(0); //empty the array
            this.range.splice(0); //empty the array
            this.single.splice(0); //empty the array
            this.selectedDate = moment(new Date(this.activeDate.valueOf())).startOf('day').toDate();
            var SingleDate = moment(this.selectedDate).startOf('day');
            this.single.push(SingleDate.toDate()); //firstdate added to range array
            this.updatemultiple.emit(this.single); //emit the value of selected date
            this.singleDateObj = dateObj;
            this.refreshView();
            //if(this.firstend == null){//detect first click
            //this.refreshView();//clearview for next operation
            this.lastend = null; //clear the last value for next operation
            this.range.splice(0); //empty the array 
            this.firstend = this.selectedDate; //set the firstend of range
            var firstDate = moment(this.firstend).startOf('day');
            this.range.push(firstDate.toDate()); //firstdate added to range array
            this.multiple.push(firstDate.toDate());
        }
    };
    DatePickerInner.prototype.move = function (direction, event) {
        var expectedStep;
        expectedStep = this.stepDay;
        if (expectedStep) {
            var year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
            var month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
            this.activeDate.setFullYear(year, month, 1);
            var active = new Date(this.activeDate.setFullYear(year, month, 1));
            this.refreshView();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerInner.prototype, "showWeeks", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatePickerInner.prototype, "updatemultiple", void 0);
    __decorate([
        //array for single selection
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerInner.prototype, "activeDate", null);
    DatePickerInner = __decorate([
        core_1.Component({
            selector: 'datepicker-inner',
            template: "\n    <div [hidden]=\"!datepickerMode\" class=\"well well-sm bg-faded p-a card\" role=\"application\" >\n      <ng-content></ng-content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerInner);
    return DatePickerInner;
}());
exports.DatePickerInner = DatePickerInner;
//# sourceMappingURL=datepicker-inner.js.map