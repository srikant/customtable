import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomTableColumnDefinition } from '../class/columnDefinition.class';
import { CustomTableConfig } from '../class/tableConfig.class';
import { CustomTableOptions } from '../class/tableOptions.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public sort(array: Array<any>, fieldName: string, direction: string, columns: Array<CustomTableColumnDefinition> ) {
      const column: CustomTableColumnDefinition = columns.filter((column) => column.value === fieldName)[0];
      const isNumeric: boolean = (column.filter && column.filter.indexOf('currency') !== -1) || (column.isNumeric === true);

      var sortFunc = function (field, rev, primer) {
        // Return the required a,b function
        return function (a, b) {
          // Reset a, b to the field
          a = primer(pathValue(a, field)), b = primer(pathValue(b, field));
          // Do actual sorting, reverse as needed
          return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
        }
      };

      // Have to handle deep paths
      var pathValue = function (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
          obj = obj[path[i]];
        };
        return obj;
      };

      var primer = isNumeric ?
        function (a) {
          var retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
          return isNaN(retValue) ? 0.0 : retValue;
        } :
        function (a) { return String(a).toUpperCase(); };

      var start = new Date().getTime();
      array.sort(sortFunc(fieldName, direction === 'desc', primer));
      var end = new Date().getTime();
      var time = end - start;
      console.log('Sort time: ' + time);
    }
}
