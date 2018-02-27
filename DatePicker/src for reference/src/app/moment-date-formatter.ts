/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
// <reference path="/typings/moment/moment.d.ts" />

//import * as moment_ from 'moment';
//const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

declare var moment: any;

export class DateFormatter {
    public format(date:Date, format:string):string {
        return moment(date.getTime()).format(format);
        //return  date.getTime().toString() ;
    }
}
