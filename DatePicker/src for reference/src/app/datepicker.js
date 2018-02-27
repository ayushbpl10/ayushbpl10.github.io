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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var DatePicker = (function () {
    function DatePicker(cd) {
        this.cd = cd;
        this._now = new Date(); //new date made
        //Array by Ayush 
        this.multipleArr = [];
        //Event by Ayush
        this.update = new core_1.EventEmitter();
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
        // hack
        cd.valueAccessor = this;
    }
    Object.defineProperty(DatePicker.prototype, "activeDate", {
        get: function () {
            return this._activeDate || this._now;
        },
        set: function (value) {
            this._activeDate = value;
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.onUpdate = function (event) {
        this.multiple = false;
        this.writeValue(event);
        this.cd.viewToModelUpdate(event);
    };
    DatePicker.prototype.onUpdateMultiple = function (event) {
        this.multiple = true;
        this.writeValue(event);
        this.cd.viewToModelUpdate(event);
    };
    // todo: support null value
    DatePicker.prototype.writeValue = function (value) {
        // todo: fix something sends here new date all the time
        // if (value) {
        //  if (typeof value !== 'Date') {
        //    value = new Date(value);
        //  }
        //
        //  this.activeDate = value;
        // }
        if (this.multiple) {
            //console.log(value);
            this.update.emit(value);
        }
        else {
            if (value === this._activeDate) {
                //console.log(value);
                this.update.emit(value);
                return;
            }
            // if (value && value instanceof Date) {
            //     this.activeDate = value;
            //     return;
            // }
            this.activeDate = value ? new Date(value) : null;
        }
    };
    DatePicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        //active date
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "datepickerMode", void 0);
    __decorate([
        //date pickermode from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePicker.prototype, "initDate", void 0);
    __decorate([
        //initdate from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePicker.prototype, "minDate", void 0);
    __decorate([
        //mindate from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePicker.prototype, "maxDate", void 0);
    __decorate([
        //max date from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "minMode", void 0);
    __decorate([
        //minmode from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "maxMode", void 0);
    __decorate([
        //max mode from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePicker.prototype, "showWeeks", void 0);
    __decorate([
        //showWeeks from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "formatDay", void 0);
    __decorate([
        //formatDay from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "formatMonth", void 0);
    __decorate([
        //formatMonth from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "formatYear", void 0);
    __decorate([
        //formatYear from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "formatDayHeader", void 0);
    __decorate([
        //formatDayHeader from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "formatDayTitle", void 0);
    __decorate([
        // formatDayTitle from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePicker.prototype, "formatMonthTitle", void 0);
    __decorate([
        //formatMonthTitle from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatePicker.prototype, "startingDay", void 0);
    __decorate([
        // startingDay from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatePicker.prototype, "yearRange", void 0);
    __decorate([
        //yearRange from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePicker.prototype, "onlyCurrentMonth", void 0);
    __decorate([
        //onlyCurrentMonth from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePicker.prototype, "shortcutPropagation", void 0);
    __decorate([
        //shortcutPropagation from datepicker-inner
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePicker.prototype, "activeDate", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatePicker.prototype, "dateDisabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatePicker.prototype, "update", void 0);
    DatePicker = __decorate([
        core_1.Component({
            selector: 'datepicker[ngModel], [datepicker][ngModel]',
            template: "\n    <datepicker-inner [activeDate]=\"activeDate\"\n                      (update)=\"onUpdate($event)\"\n                      (updatemultiple)=\"onUpdateMultiple($event)\"\n                      [datepickerMode]=\"datepickerMode\"\n                      [initDate]=\"initDate\"\n                      [minDate]=\"minDate\"\n                      [maxDate]=\"maxDate\"\n                      [minMode]=\"minMode\"\n                      [maxMode]=\"maxMode\"\n                      [showWeeks]=\"showWeeks\"\n                      [formatDay]=\"formatDay\"\n                      [formatMonth]=\"formatMonth\"\n                      [formatYear]=\"formatYear\"\n                      [formatDayHeader]=\"formatDayHeader\"\n                      [formatDayTitle]=\"formatDayTitle\"\n                      [formatMonthTitle]=\"formatMonthTitle\"\n                      [startingDay]=\"startingDay\"\n                      [yearRange]=\"yearRange\"\n                      [customClass]=\"customClass\"\n                      [dateDisabled]=\"dateDisabled\"\n                      [templateUrl]=\"templateUrl\"\n                      [onlyCurrentMonth]=\"onlyCurrentMonth\"\n                      [shortcutPropagation]=\"shortcutPropagation\">\n      <daypicker tabindex=\"0\"></daypicker>\n    </datepicker-inner>\n    "
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [forms_1.NgModel])
    ], DatePicker);
    return DatePicker;
}());
exports.DatePicker = DatePicker;
//# sourceMappingURL=datepicker.js.map