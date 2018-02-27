import {Component, Self, Input,EventEmitter,Output,ViewChild} from '@angular/core';
import {
    ControlValueAccessor,
    NgModel
} from '@angular/forms';

import {DatePickerInner} from './datepicker-inner';


@Component({
    selector: 'datepicker[ngModel], [datepicker][ngModel]',
    template: `
    <datepicker-inner [activeDate]="activeDate"
                      (updatemultiple)="onUpdateMultiple($event)"
                      [showWeeks]="showWeeks">
      <daypicker tabindex="0"></daypicker>
    </datepicker-inner>
    <div class="center-align">
        <button type="button" class="btn" (click)="clearTheCurrentDate()">Clear Selection !</button>
    </div>
    `
})

export class DatePicker implements ControlValueAccessor {


    @ViewChild(DatePickerInner)
    public _datepickerinner: DatePickerInner;

    @Input() public showWeeks:boolean = false;//showWeeks from datepicker-inner


    constructor(@Self() public cd:NgModel) {//look for NgModel where datepicker is defined
        // hack
        cd.valueAccessor = this;
    }

    @Output() update : EventEmitter <Array<Date>> = new EventEmitter();
        
    //set the date to null, clear it
    private clearTheCurrentDate() {
        this._datepickerinner.clear();
    }

    private onUpdateMultiple(event : any){
            this.writeValue(event);
    }

    // todo: support null value
    writeValue(value:Array<Date>) {
        // todo: fix something sends here new date all the time         
                
                this.update.emit(value);

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
