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
        this.update = new core_1.EventEmitter();
        //Event by Ayush
        this.updatemultiple = new core_1.EventEmitter();
        //Array by Ayush
        this.multiple = [this.activeDate];
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
            this.refreshView();
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
        if (type === 'month') {
            this.compareHandlerMonth = handler;
        }
        if (type === 'year') {
            this.compareHandlerYear = handler;
        }
    };
    DatePickerInner.prototype.compare = function (date1, date2) {
        if (this.datepickerMode === 'day' && this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }
        if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
            return this.compareHandlerMonth(date1, date2);
        }
        if (this.datepickerMode === 'year' && this.compareHandlerYear) {
            return this.compareHandlerYear(date1, date2);
        }
        return null;
    };
    DatePickerInner.prototype.setRefreshViewHandler = function (handler, type) {
        if (type === 'day') {
            this.refreshViewHandlerDay = handler;
        }
        if (type === 'month') {
            this.refreshViewHandlerMonth = handler;
        }
        if (type === 'year') {
            this.refreshViewHandlerYear = handler;
        }
    };
    DatePickerInner.prototype.refreshView = function () {
        if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }
        if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
            this.refreshViewHandlerMonth();
        }
        if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
            this.refreshViewHandlerYear();
        }
    };
    DatePickerInner.prototype.dateFilter = function (date, format) {
        return this.dateFormatter.format(date, format);
    };
    DatePickerInner.prototype.isActive = function (dateObject) {
        if (this.compare(dateObject.date, this.activeDate) === 0) {
            this.activeDateId = dateObject.uid;
            return true;
        }
        return false;
    };
    DatePickerInner.prototype.createDateObject = function (date, format) {
        var dateObject = {};
        dateObject.date = date;
        dateObject.label = this.dateFilter(date, format);
        dateObject.selected = this.compare(date, this.selectedDate) === 0;
        dateObject.disabled = this.isDisabled(date);
        dateObject.current = this.compare(date, new Date()) === 0;
        return dateObject;
    };
    DatePickerInner.prototype.isDisabled = function (date) {
        // todo: implement dateDisabled attribute
        return ((this.minDate && this.compare(date, this.minDate) < 0) ||
            (this.maxDate && this.compare(date, this.maxDate) > 0));
    };
    ;
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
    DatePickerInner.prototype.select = function (date, event) {
        if (this.datepickerMode === this.minMode) {
            if (!this.activeDate) {
                this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
                console.log(event, "Not active Date");
            }
            this.activeDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        }
        else {
            this.activeDate = date;
            this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
            console.log(event, "else");
        }
        // if(event.ctrlKey == true){
        //     this.selectedDate = new Date(this.activeDate.valueOf());
        //     this.multiple.push(this.selectedDate);
        //     this.updatemultiple.emit(this.multiple);
        // }
        // else{
        this.selectedDate = new Date(this.activeDate.valueOf());
        this.update.emit(this.activeDate);
        // }
        this.refreshView();
    };
    DatePickerInner.prototype.move = function (direction) {
        var expectedStep;
        if (this.datepickerMode === 'day') {
            expectedStep = this.stepDay;
        }
        if (this.datepickerMode === 'month') {
            expectedStep = this.stepMonth;
        }
        if (this.datepickerMode === 'year') {
            expectedStep = this.stepYear;
        }
        if (expectedStep) {
            var year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
            var month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
            this.activeDate.setFullYear(year, month, 1);
            this.refreshView();
        }
    };
    DatePickerInner.prototype.toggleMode = function (direction) {
        direction = direction || 1;
        if ((this.datepickerMode === this.maxMode && direction === 1) ||
            (this.datepickerMode === this.minMode && direction === -1)) {
            return;
        }
        this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
        this.refreshView();
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
//# sourceMappingURL=datepicker-container.js.map