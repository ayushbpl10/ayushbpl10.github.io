import {Component, OnInit, EventEmitter, Input,Output} from '@angular/core';
import { NgClass} from '@angular/common';
import { NgModel} from '@angular/forms'

import {DateFormatter} from './moment-date-formatter';

declare var moment: any;


const FORMAT_DAY:string = 'DD';
const FORMAT_MONTH:string = 'MMMM';
const FORMAT_YEAR:string = 'YYYY';
const FORMAT_DAY_HEADER:string = 'dd';
const FORMAT_DAY_TITLE:string = 'MMMM YYYY';
const FORMAT_MONTH_TITLE:string = 'YYYY';
const DATEPICKER_MODE:string = 'day';

const STARTING_DAY:number = 0;
const YEAR_RANGE:number = 20;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const KEYS = {
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

@Component({
    selector: 'datepicker-inner',
    template: `
    <div [hidden]="!datepickerMode" class="well well-sm bg-faded p-a card" role="application" >
      <ng-content></ng-content>
    </div>
  `
})
export class DatePickerInner implements OnInit {

    
    public stepDay:any = {};
    public stepMonth:any = {};
    public stepYear:any = {};

    private modes:Array<string> = ['day', 'month', 'year'];
    private dateFormatter:DateFormatter = new DateFormatter();
    private uniqueId:string;
    private _activeDate:Date;
    private selectedDate:Date;
    private _initDate:Date;
    private activeDateId:string;

    private formatDay : string;
    private formatMonth : string;
    private formatYear: string;
    private formatDayHeader: string;
    private formatDayTitle: string;
    private formatMonthTitle: string;
    

    private startingDay :number;
    private yearRange :number;

    private datepickerMode :string;
        

    @Input()
    private showWeeks:boolean ;
    
    private refreshViewHandlerDay:Function;
    private compareHandlerDay:Function;
    
    //@Output() private update:EventEmitter<Date> = new EventEmitter();
    
    //Event by Ayush
    @Output() private updatemultiple : EventEmitter <Array<Date>> = new EventEmitter();

    //format by Ayush
    private format : any;
    
    //For shift key by Ayush
    range : Array<Date> = [] ; //array for range selection
    private firstend : any;
    private lastend : any;
    private TargetElm : any;//target element for shift key to add classes to thr range element
    private FirstTarget : any;
    private EndTarget : any;

    single : Array<Date> = [] ; //array for single selection

    @Input()
    private get activeDate():Date {
        return this._activeDate;
    }

    private set activeDate(value:Date) {
        this._activeDate = value;
        
        if(this.range.length != 1 && this.multiple.length != 1){//to set the first current date in the array
            this.range.push(moment(this._activeDate).startOf('day').toDate());
            this.multiple.push(moment(this._activeDate).startOf('day').toDate());
        }
         
    }
    //Array by Ayush
    multiple : Array<Date> = [] ;//Array for multiple dates selection
    //SingleDate by Ayush as it never removed the class active//kindly check for type 
    singleDateObj : any;


     ngOnInit() {
        this.formatDay = FORMAT_DAY;
        this.formatMonth = FORMAT_MONTH;
        this.formatYear = FORMAT_YEAR;
        this.formatDayHeader = FORMAT_DAY_HEADER;
        this.formatDayTitle = FORMAT_DAY_TITLE;
        this.formatMonthTitle = FORMAT_MONTH_TITLE;
        
    
        this.startingDay = STARTING_DAY;
        this.yearRange =  YEAR_RANGE;
    
        this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
        
        

        this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);

        
        this.activeDate = new Date();
        
        this.selectedDate = null;//No selected date
        
        this.refreshView();
    }

    

    public clear(){
        
        this.multiple.splice(0);
        this.range.splice(0);
        this.single.splice(0);
        this.ngOnInit();
        this.updatemultiple.emit(this.single);
    }

    public setCompareHandler(handler:Function, type:string) {
        this.compareHandlerDay = handler;
    }

    public compare(date1:Date, date2:Date):number {
        if (this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }

        return null;
    }

    public setRefreshViewHandler(handler:Function, type:string) {
    
            this.refreshViewHandlerDay = handler;
        

    }


    public refreshView() {
        if (this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }

      
    }

    public dateFilter(date:Date, format:string):string {
        return this.dateFormatter.format(date, format);
    }

    private createDateObject(date:Date, format:string):any {
        this.format = format;//format added by Ayush for checking if the date has already been selected by checking array
        let dateObject:any = {};
        dateObject.date = date;
        dateObject.label = this.dateFilter(date, format);
        let that = this;
        console.log("create"); 
        
        if(this.selectedDate == null){
            dateObject.selected = false;
        }else{
            dateObject.selected = this.compare(date, this.selectedDate) === 0;
        }
        
        if(this.range.length > 0){
            
            let that = this;
            this.range.forEach(function(value,index){
                if(date.getTime() == value.getTime()){
                    dateObject.selected = true;
                    return false;
                }
            });
        }
        else if(this.multiple.length > 0){
            
            let that = this;
            this.multiple.forEach(function(value,index){
                if(date.getTime() == value.getTime()){
                    dateObject.selected = true;
                    return false;
                }
            });
        }
        
        dateObject.current = this.compare(date, new Date()) === 0;
        if(dateObject.current == true && this.selectedDate == null){
            dateObject.selected = false;
        }
         return dateObject;
    }

    

    private split(arr:Array<any>, size:number) {
        let arrays:Array<any> = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    }


    public fixTimeZone(date:Date) {
        let hours = date.getHours();
        date.setHours(hours === 23 ? hours + 2 : 0);
    }

    public select(dateObj:any,event:any) {
        
            if (!this.activeDate) {
                this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
            }
            
            this.activeDate.setFullYear(dateObj.date.getFullYear(), dateObj.date.getMonth(), dateObj.date.getDate());

        if(event.ctrlKey == true){
            
            if(this.range.length != 1){
                this.multiple = this.multiple.concat(this.range);
                this.range.splice(0);
            }
            
            if(this.selectedDate  == null){
                this.multiple.splice(0);
            }
            
            dateObj.selected = true;//setting selected to true which attaches class btn-info
            this.selectedDate = new Date(this.activeDate.valueOf());//getting the date
    

            let that=this;
            this.multiple.forEach(function(value,index){//traversing for checking selected elements to remove them
                if(moment(that.selectedDate).startOf('day').toDate().getTime() == value.getTime()){//comparing the time of dates for removal
                    console.log("matched");
                    dateObj.selected = false;//setting selected to false
                    that.multiple.splice(index,1);//removing element whichwas already selected
                    that.updatemultiple.emit(that.multiple);//emitting array
                }
            });
            
            if(dateObj.selected){
                var date = moment(this.selectedDate).startOf('day');
                this.multiple.push(date.toDate());
                this.updatemultiple.emit(this.multiple);//emitting array if there's a new element
            }

            
            
        }
        else if(event.shiftKey == true){
            if(this.multiple.length != 0 ){
                this.firstend = this.multiple.pop();
            }
            
            this.multiple.splice(0);
            dateObj.selected = true;//setting selected to true which attaches class btn-info

            this.selectedDate = new Date(this.activeDate.valueOf());//getting the date
            
            if(this.lastend == null){//detect second click for end date
                
                //this.EndTarget = this.TargetElm;//End Target to traverse the Domo decided
                this.lastend = this.selectedDate;
                console.log("lastend");
                 
                var firstDate = moment(this.firstend).startOf('day');
                var lastDate = moment(this.lastend).startOf('day');

                if(firstDate.isAfter(lastDate)){
                    if(this.range.length != 0 ){
                        this.range.splice(0);
                    }
                    this.range.push(firstDate.toDate());
                    while(firstDate.subtract(1,'days').diff(lastDate) >= 0) {
                        this.range.push(firstDate.toDate());
                    }
                }
                else if (firstDate.isBefore(lastDate)){
                    if(this.range.length != 0 ){
                        this.range.splice(0);
                    }
                    this.range.push(firstDate.toDate());
                    while(firstDate.add(1,'days').diff(lastDate) <= 0) {
                        this.range.push(firstDate.toDate());
                    }
                }
                
                this.updatemultiple.emit(this.range);//emitting array if range is selected
                
                this.lastend = null;
                this.refreshView();
            }

        }
        else{
            this.multiple.splice(0);//empty the array
            this.range.splice(0);//empty the array
            this.single.splice(0);//empty the array
            this.selectedDate = moment(new Date(this.activeDate.valueOf())).startOf('day').toDate();

            var SingleDate = moment(this.selectedDate).startOf('day');
            this.single.push(SingleDate.toDate());//firstdate added to range array


            this.updatemultiple.emit(this.single);//emit the value of selected date
            this.singleDateObj  = dateObj;
            this.refreshView();

            //if(this.firstend == null){//detect first click
                //this.refreshView();//clearview for next operation
                this.lastend = null;//clear the last value for next operation
                this.range.splice(0);//empty the array 
                this.firstend = this.selectedDate;//set the firstend of range

                var firstDate = moment(this.firstend).startOf('day');
                this.range.push(firstDate.toDate());//firstdate added to range array
                this.multiple.push(firstDate.toDate());
            //}
            
        }
        
    }

    public move(direction:number,event : any) {
        let expectedStep:any;
      
            expectedStep = this.stepDay;
        

        
        if (expectedStep) {
            let year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
            let month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
            this.activeDate.setFullYear(year, month, 1);

            let active = new Date(this.activeDate.setFullYear(year, month, 1));

            this.refreshView();
            
        }
        
    }

 }
