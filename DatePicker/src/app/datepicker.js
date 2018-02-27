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
var datepicker_inner_1 = require('./datepicker-inner');
var DatePicker = (function () {
    function DatePicker(cd) {
        this.cd = cd;
        this.showWeeks = false; //showWeeks from datepicker-inner
        this.update = new core_1.EventEmitter();
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
        // hack
        cd.valueAccessor = this;
    }
    //set the date to null, clear it
    DatePicker.prototype.clearTheCurrentDate = function () {
        this._datepickerinner.clear();
    };
    DatePicker.prototype.onUpdateMultiple = function (event) {
        this.writeValue(event);
    };
    // todo: support null value
    DatePicker.prototype.writeValue = function (value) {
        // todo: fix something sends here new date all the time         
        this.update.emit(value);
    };
    DatePicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.ViewChild(datepicker_inner_1.DatePickerInner), 
        __metadata('design:type', datepicker_inner_1.DatePickerInner)
    ], DatePicker.prototype, "_datepickerinner", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePicker.prototype, "showWeeks", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatePicker.prototype, "update", void 0);
    DatePicker = __decorate([
        core_1.Component({
            selector: 'datepicker[ngModel], [datepicker][ngModel]',
            template: "\n    <datepicker-inner [activeDate]=\"activeDate\"\n                      (updatemultiple)=\"onUpdateMultiple($event)\"\n                      [showWeeks]=\"showWeeks\">\n      <daypicker tabindex=\"0\"></daypicker>\n    </datepicker-inner>\n    <div class=\"center-align\">\n        <button type=\"button\" class=\"btn\" (click)=\"clearTheCurrentDate()\">Clear Selection !</button>\n    </div>\n    "
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [forms_1.NgModel])
    ], DatePicker);
    return DatePicker;
}());
exports.DatePicker = DatePicker;
//# sourceMappingURL=datepicker.js.map