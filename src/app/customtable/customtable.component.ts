import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomTableColumnDefinition } from '../class/columnDefinition.class';
import { CustomTableConfig } from '../class/tableConfig.class';
import { CustomTableOptions } from '../class/tableOptions.class';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {

    private _lipsum: any;
    private _start: Date;
    private _end: Date;
    private _isSorting = false;
    public filteredData: Array<any>;
    public filteredDataObservable: Observable<Array<any>>;
    _subscription: any;
    @Input() options: CustomTableOptions;
    @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef, private dataSvc: DataService) {
   // declare var LoremIpsum: any;
   // this._lipsum = new LoremIpsum();
  }

  isSorting(name: string) {
    return this.options.config.sortBy !== name && name !== '';
  }

  isSortAsc(name: string) {
    const isSortAsc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
    return isSortAsc;
  }

  isSortDesc(name: string) {
    const isSortDesc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
    return isSortDesc;
  }

  sortHeaderClick(headerName: string) {
    if (headerName) {
      if (this.options.config.sortBy === headerName) {
        this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.options.config.sortBy = headerName;
      this.sortChange.emit();
    }
  }

  getCellValue(row: any, column: CustomTableColumnDefinition): string {
    if (column.isComputed) {
      const evalfunc = new Function ('r', 'return ' + column.binding);
      const evalresult: string = evalfunc(row);
      return evalresult;
    } else {
      return column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
    }
  }

  ngOnInit() {

    this._subscription = this.options.records.subscribe(res => {
      this.filteredDataObservable = of(res);
        this.filteredData = res;
        this.changeRef.markForCheck();
        // this.zone = new NgZone({enableLongStackTrace: false});
        // this.zone.run(() => {
        //  console.log('Received table data');
        // });
    });
  }

}
