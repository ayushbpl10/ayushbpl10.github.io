import { Component,ViewChild } from '@angular/core';
import {DatePickerInner} from './datepicker-inner';


declare var moment: any;
@Component({
  selector: 'my-app',
  template: `
                
                <div>
                  <!-- <p>The current selected date is: <span *ngIf="currentDate">{{ getDate() | date:'fullDate'}}</span></p> -->
                  <!-- <button type="button" class="btn btn-sm btn-info" (click)="setToday()">Set The Current Date to Today</button> -->
                  <!-- <button type="button" class="btn btn-sm btn-default btn-info" (click)="setADate();">Set this date : 2020-02-02</button> -->

                  <div style="width: 350px;">
                    <datepicker [(ngModel)]="currentDate" [minDate]="minDate" [showWeeks]="false" (update)="onUpdate($event)"></datepicker>
                  </div>

                  <hr />
                  <button type="button" class="btn btn-sm btn-info" (click)="clearTheCurrentDate()">Clear The Current Selected Date !</button>

                </div>
                `,
  styles: [`                  
  
                  .full button span {
                    background-color: limegreen;
                    border-radius: 32px;
                    color: black;
                  }
                  .partially button span {
                    background-color: orange;
                    border-radius: 32px;
                    color: black;
                  }
`]
})
export class AppComponent { 

    @ViewChild(DatePickerInner)
    public _datepickerinner: DatePickerInner;

    
    public currentDate: Date = new Date();//current date object
    private events:Array<any>;//Array of objects of tomorrow and afterTomorrow 
    private tomorrow:Date;//tomorrrow date object
    private afterTomorrow:Date;//after tomorrow date object
    private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];//formats array
    private format = this.formats[0];//first format selected
    private dateOptions:any = {
        formatYear: 'YY',
        startingDay: 1
    };//starting day is monday formatyear is YY
    //private opened:boolean = false;

    constructor() {
    
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);//setDate takes day(number i.e. 1-31) of month get date returns day(number i.e. 1-31) of month
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);//setDate takes day(number i.e. 1-31) of month get date returns day(number i.e. 1-31) of month
        this.events = [
            {date: this.tomorrow, status: 'full'},
            {date: this.afterTomorrow, status: 'partially'}
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
    private clearTheCurrentDate() {
        //this.refreshView();
        this._datepickerinner.clear();
    }

    onUpdate(value : any){
        console.log(value);
    }

 }
