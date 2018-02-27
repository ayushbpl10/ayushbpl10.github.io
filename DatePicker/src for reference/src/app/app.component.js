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
var AppComponent = (function () {
    //private opened:boolean = false;
    function AppComponent() {
        this.currentDate = new Date(); //current date object
        this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate']; //formats array
        this.format = this.formats[0]; //first format selected
        this.dateOptions = {
            formatYear: 'YY',
            startingDay: 1
        }; //starting day is monday formatyear is YY
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1); //setDate takes day(number i.e. 1-31) of month get date returns day(number i.e. 1-31) of month
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2); //setDate takes day(number i.e. 1-31) of month get date returns day(number i.e. 1-31) of month
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    //set your date
    // private setADate() {
    //   //gives the date object
    //     this.currentDate = moment('2020-02-02', 'YYYY-MM-DD').toDate();
    // }
    // // get the current selected date if the date is present
    // public getDate():number {
    //     return  ;//this.currentDate.getTime() || new Date().getTime();
    // }
    //set a new value to the current date that is set the value of today
    // private setToday() {
    //     this.currentDate = new Date();
    // }
    // private getDayClass(date:any, mode:string) {
    //     if (mode === 'day') {//no type conversion while checking
    //         let dayToCheck = new Date(date).setHours(0, 0, 0, 0);//sets the date to 12am midnight of given date
    //         for (let i = 0; i < this.events.length; i++) {
    //             let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
    //             if (dayToCheck === currentDay) {
    //                 return this.events[i].status;
    //             }
    //         }
    //     }
    //     return '';
    // }
    // private disabled(date:Date, mode:string):boolean {
    //     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );//if day is sunday or saturday then return true
    // }
    // private open() {
    //     this.opened = !this.opened;
    // }
    //set the date to null, clear it
    AppComponent.prototype.clearTheCurrentDate = function () {
        //this.refreshView();
        this._datepickerinner.clear();
    };
    AppComponent.prototype.onUpdate = function (value) {
        console.log(value);
    };
    __decorate([
        core_1.ViewChild(datepicker_inner_1.DatePickerInner), 
        __metadata('design:type', datepicker_inner_1.DatePickerInner)
    ], AppComponent.prototype, "_datepickerinner", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n                \n                <div>\n                  <!-- <p>The current selected date is: <span *ngIf=\"currentDate\">{{ getDate() | date:'fullDate'}}</span></p> -->\n                  <!-- <button type=\"button\" class=\"btn btn-sm btn-info\" (click)=\"setToday()\">Set The Current Date to Today</button> -->\n                  <!-- <button type=\"button\" class=\"btn btn-sm btn-default btn-info\" (click)=\"setADate();\">Set this date : 2020-02-02</button> -->\n\n                  <div style=\"width: 350px;\">\n                    <datepicker [(ngModel)]=\"currentDate\" [minDate]=\"minDate\" [showWeeks]=\"false\" (update)=\"onUpdate($event)\"></datepicker>\n                  </div>\n\n                  <hr />\n                  <button type=\"button\" class=\"btn btn-sm btn-info\" (click)=\"clearTheCurrentDate()\">Clear The Current Selected Date !</button>\n\n                </div>\n                ",
            styles: ["                  \n  \n                  .full button span {\n                    background-color: limegreen;\n                    border-radius: 32px;\n                    color: black;\n                  }\n                  .partially button span {\n                    background-color: orange;\n                    border-radius: 32px;\n                    color: black;\n                  }\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map