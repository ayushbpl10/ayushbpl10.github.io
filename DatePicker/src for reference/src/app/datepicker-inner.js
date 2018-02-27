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
var MIN_MODE = 'day';
var MAX_MODE = 'year';
var SHOW_WEEKS = true;
var ONLY_CURRENT_MONTH = false;
var STARTING_DAY = 0;
var YEAR_RANGE = 20;
var MIN_DATE = null;
var MAX_DATE = null;
var SHORTCUT_PROPAGATION = false;
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
        //private refreshViewHandlerMonth:Function;
        //private compareHandlerMonth:Function;
        //private refreshViewHandlerYear:Function;
        //private compareHandlerYear:Function;
        this.update = new core_1.EventEmitter();
        //Event by Ayush
        this.updatemultiple = new core_1.EventEmitter();
        //For shift key by Ayush
        this.range = []; //array for range selection
        //Array by Ayush
        this.multiple = []; //Array for multiple dates selection
    }
    Object.defineProperty(DatePickerInner.prototype, "initDate", {
        get: function () {
            return this._initDate;
        },
        set: function (value) {
            this._initDate = value;
        },
        enumerable: true,
        configurable: true
    });
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
        this.formatDay = this.formatDay || FORMAT_DAY;
        this.formatMonth = this.formatMonth || FORMAT_MONTH;
        this.formatYear = this.formatYear || FORMAT_YEAR;
        this.formatDayHeader = this.formatDayHeader || FORMAT_DAY_HEADER;
        this.formatDayTitle = this.formatDayTitle || FORMAT_DAY_TITLE;
        this.formatMonthTitle = this.formatMonthTitle || FORMAT_MONTH_TITLE;
        this.showWeeks = (this.showWeeks === undefined ? SHOW_WEEKS : this.showWeeks);
        this.onlyCurrentMonth = (this.onlyCurrentMonth === undefined ? ONLY_CURRENT_MONTH : this.onlyCurrentMonth);
        this.startingDay = this.startingDay || STARTING_DAY;
        this.yearRange = this.yearRange || YEAR_RANGE;
        this.shortcutPropagation = this.shortcutPropagation || SHORTCUT_PROPAGATION;
        this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
        this.minMode = this.minMode || MIN_MODE;
        this.maxMode = this.maxMode || MAX_MODE;
        this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);
        if (this.initDate) {
            this.activeDate = this.initDate;
        }
        else {
            this.activeDate = new Date();
        }
        this.selectedDate = new Date(this.activeDate.valueOf());
        this.update.emit(this.activeDate);
        this.refreshView();
    };
    DatePickerInner.prototype.setCompareHandler = function (handler, type) {
        if (type === 'day') {
            this.compareHandlerDay = handler;
        }
        // if (type === 'month') {
        //     this.compareHandlerMonth = handler;
        // }
        // if (type === 'year') {
        //     this.compareHandlerYear = handler;
        // }
    };
    DatePickerInner.prototype.compare = function (date1, date2) {
        if (this.datepickerMode === 'day' && this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }
        // if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
        //     return this.compareHandlerMonth(date1, date2);
        // }
        // if (this.datepickerMode === 'year' && this.compareHandlerYear) {
        //     return this.compareHandlerYear(date1, date2);
        // }
        return null;
    };
    DatePickerInner.prototype.setRefreshViewHandler = function (handler, type) {
        if (type === 'day') {
            this.refreshViewHandlerDay = handler;
        }
        // if (type === 'month') {
        //     this.refreshViewHandlerMonth = handler;
        // }
        // if (type === 'year') {
        //     this.refreshViewHandlerYear = handler;
        // }
    };
    DatePickerInner.prototype.clear = function () {
        this.refreshView();
    };
    DatePickerInner.prototype.refreshView = function () {
        if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }
        // if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
        //     this.refreshViewHandlerMonth();
        // }
        // if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
        //     this.refreshViewHandlerYear();
        // }
    };
    DatePickerInner.prototype.dateFilter = function (date, format) {
        return this.dateFormatter.format(date, format);
    };
    DatePickerInner.prototype.isActive = function (dateObject) {
        if (this.compare(dateObject.date, this.activeDate) === 0) {
            this.activeDateId = dateObject.uid;
            this.singleDateObj = dateObject; //Added by Ayush to prevent selected(btn-info) class to remain attached to the date after ctrl press
            return true;
        }
        return false;
    };
    DatePickerInner.prototype.createDateObject = function (date, format) {
        this.format = format; //format added by Ayush for checking if the date has already been selected by checking array
        var dateObject = {};
        dateObject.date = date;
        dateObject.label = this.dateFilter(date, format);
        var that = this;
        console.log("create");
        dateObject.selected = this.compare(date, this.selectedDate) === 0;
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
        //dateObject.disabled = this.isDisabled(date);
        dateObject.current = this.compare(date, new Date()) === 0;
        return dateObject;
    };
    // private isDisabled(date:Date):boolean {
    //     // todo: implement dateDisabled attribute
    //     return ((this.minDate && this.compare(date, this.minDate) < 0) ||
    //     (this.maxDate && this.compare(date, this.maxDate) > 0));
    // };
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
        if (this.datepickerMode === this.minMode) {
            if (!this.activeDate) {
                this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
            }
            this.activeDate.setFullYear(dateObj.date.getFullYear(), dateObj.date.getMonth(), dateObj.date.getDate());
        }
        else {
        }
        if (this.multiple.length == 0) {
            //console.log("zero");
            this.singleDateObj.selected = false;
        }
        if (event.ctrlKey == true) {
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
            if (this.range.length != 0) {
                this.range.splice(0);
                this.refreshView();
            }
        }
        else if (event.shiftKey == true) {
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
                    if (this.range.length != 1) {
                        this.range.splice(1);
                    }
                    while (firstDate.subtract(1, 'days').diff(lastDate) >= 0) {
                        this.range.push(firstDate.toDate());
                    }
                }
                else if (firstDate.isBefore(lastDate)) {
                    if (this.range.length != 1) {
                        this.range.splice(1);
                    }
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
            this.selectedDate = moment(new Date(this.activeDate.valueOf())).startOf('day').toDate();
            this.update.emit(this.activeDate); //emit the value of selected date
            this.singleDateObj = dateObj;
            this.refreshView();
            //if(this.firstend == null){//detect first click
            //this.refreshView();//clearview for next operation
            this.lastend = null; //clear the last value for next operation
            this.range.splice(0); //empty the array 
            this.firstend = this.selectedDate; //set the firstend of range
            console.log("firstend");
            var firstDate = moment(this.firstend).startOf('day');
            this.range.push(firstDate.toDate()); //firstdate added to range array
        }
    };
    DatePickerInner.prototype.move = function (direction, event) {
        var expectedStep;
        if (this.datepickerMode === 'day') {
            expectedStep = this.stepDay;
        }
        // if (this.datepickerMode === 'month') {
        //     expectedStep = this.stepMonth;
        // }
        // if (this.datepickerMode === 'year') {
        //     expectedStep = this.stepYear;
        // }
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
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "datepickerMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatePickerInner.prototype, "startingDay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatePickerInner.prototype, "yearRange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerInner.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerInner.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "minMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "maxMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerInner.prototype, "showWeeks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "formatDay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "formatMonth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "formatYear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "formatDayHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "formatDayTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "formatMonthTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerInner.prototype, "onlyCurrentMonth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerInner.prototype, "shortcutPropagation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatePickerInner.prototype, "customClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatePickerInner.prototype, "dateDisabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerInner.prototype, "templateUrl", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatePickerInner.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatePickerInner.prototype, "updatemultiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerInner.prototype, "initDate", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerInner.prototype, "activeDate", null);
    DatePickerInner = __decorate([
        core_1.Component({
            selector: 'datepicker-inner',
            //events: ['update'],
            template: "\n    <div [hidden]=\"!datepickerMode\" class=\"well well-sm bg-faded p-a card\" role=\"application\" >\n      <ng-content></ng-content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerInner);
    return DatePickerInner;
}());
exports.DatePickerInner = DatePickerInner;
//# sourceMappingURL=datepicker-inner.js.map