import {Component, Self, Input,EventEmitter,Output} from '@angular/core';
import {
    ControlValueAccessor,
    NgModel
} from '@angular/forms';



@Component({
    selector: 'datepicker[ngModel], [datepicker][ngModel]',
    template: `
    <datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate($event)"
                      (updatemultiple)="onUpdateMultiple($event)"
                      [datepickerMode]="datepickerMode"
                      [initDate]="initDate"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      [minMode]="minMode"
                      [maxMode]="maxMode"
                      [showWeeks]="showWeeks"
                      [formatDay]="formatDay"
                      [formatMonth]="formatMonth"
                      [formatYear]="formatYear"
                      [formatDayHeader]="formatDayHeader"
                      [formatDayTitle]="formatDayTitle"
                      [formatMonthTitle]="formatMonthTitle"
                      [startingDay]="startingDay"
                      [yearRange]="yearRange"
                      [customClass]="customClass"
                      [dateDisabled]="dateDisabled"
                      [templateUrl]="templateUrl"
                      [onlyCurrentMonth]="onlyCurrentMonth"
                      [shortcutPropagation]="shortcutPropagation">
      <daypicker tabindex="0"></daypicker>
    </datepicker-inner>
    `
})

export class DatePicker implements ControlValueAccessor {
    private _activeDate:Date;//active date
    @Input() public datepickerMode:string;//date pickermode from datepicker-inner
    @Input() public initDate:Date;//initdate from datepicker-inner
    @Input() public minDate:Date;//mindate from datepicker-inner
    @Input() public maxDate:Date;//max date from datepicker-inner
    @Input() public minMode:string;//minmode from datepicker-inner
    @Input() public maxMode:string;//max mode from datepicker-inner
    @Input() public showWeeks:boolean;//showWeeks from datepicker-inner
    @Input() public formatDay:string;//formatDay from datepicker-inner
    @Input() public formatMonth:string;//formatMonth from datepicker-inner
    @Input() public formatYear:string;//formatYear from datepicker-inner
    @Input() public formatDayHeader:string;//formatDayHeader from datepicker-inner
    @Input() public formatDayTitle:string;// formatDayTitle from datepicker-inner
    @Input() public formatMonthTitle:string;//formatMonthTitle from datepicker-inner
    @Input() public startingDay:number;// startingDay from datepicker-inner
    @Input() public yearRange:number;//yearRange from datepicker-inner
    @Input() public onlyCurrentMonth:boolean;//onlyCurrentMonth from datepicker-inner
    @Input() public shortcutPropagation:boolean;//shortcutPropagation from datepicker-inner

    @Input() public get activeDate():Date {
        return this._activeDate || this._now;
    }

    public set activeDate(value:Date) {
        this._activeDate = value;
    }

    // todo: change type during implementation
    public customClass:any;
    // todo: change type during implementation
    @Input() public dateDisabled:any;//dateDisabled from datepicker-inner

    constructor(@Self() public cd:NgModel) {//look for NgModel where datepicker is defined
        // hack
        cd.valueAccessor = this;
    }

    private _now:Date = new Date();//new date made

    multiple : boolean;
    //Array by Ayush 
    multipleArr : Array<Date> = [] ;
    //Event by Ayush
    @Output() update : EventEmitter <Array<Date>> = new EventEmitter();
    

    private onUpdate(event:any) {
        this.multiple = false;
        this.writeValue(event);
        this.cd.viewToModelUpdate(event);
    }

    private onUpdateMultiple(event : any){
        
        this.multiple = true;
        this.writeValue(event);
        this.cd.viewToModelUpdate(event);
    
    }

    // todo: support null value
    writeValue(value:any) {
        // todo: fix something sends here new date all the time
        // if (value) {
        //  if (typeof value !== 'Date') {
        //    value = new Date(value);
        //  }
        //
        //  this.activeDate = value;
        // }
        if(this.multiple){
            //console.log(value);
            this.update.emit(value);

        }
        else{
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
        
    }

    onChange = (_:any) => {
    };
    onTouched = () => {
    };

    registerOnChange(fn:(_:any) => {}):void {
        this.onChange = fn;
    }

    registerOnTouched(fn:() => {}):void {
        this.onTouched = fn;
    }
}
