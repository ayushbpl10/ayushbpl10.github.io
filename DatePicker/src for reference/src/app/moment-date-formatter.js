/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
// <reference path="/typings/moment/moment.d.ts" />
"use strict";
var DateFormatter = (function () {
    function DateFormatter() {
    }
    DateFormatter.prototype.format = function (date, format) {
        return moment(date.getTime()).format(format);
        //return  date.getTime().toString() ;
    };
    return DateFormatter;
}());
exports.DateFormatter = DateFormatter;
//# sourceMappingURL=moment-date-formatter.js.map