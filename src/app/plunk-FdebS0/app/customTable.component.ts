import { Component,Input,Output, Injectable, ApplicationRef,EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs/Rx';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './services/data.service';

export class CustomTableColumnDefinition {
  public name: string = '';
  public value: string = '';
  public binding: string = '';
  public filter: string = '';
  public computedClass: any;
  public isComputed: bool = false;
  public isAnchor: bool = false;
  public srefBinding: string = '';
}

export class CustomTableConfig {
  public sortBy: string = '';
  public sortDirection: string = 'desc';
  public pageSize: int = 100;
  public pageNumber: int = 1;
  public totalCount: int = 0;
  public totalPages: int = 0;
  public maxSize: int = 10;
  public showSelectCheckbox: bool = true;
  public showSelectAll: bool = true;
  public showSort: bool = true;
  public clientSort: bool = false;
  public clientPaging: bool = false;
  public stickyHeader: bool = true;
  public stickyHeaderOffset: int = 0;
  public stickyContainer: string = '';
}

export class CustomTableOptions {
  public records : Observable<Array<any>>;
  public columns: Array<CustomTableColumnDefinition>;
  public rowDefns: Array<any>;
  public config: CustomTableConfig;
  public callbacks: any;
}

@Component({
  selector: 'custom-table',
  templateUrl: 'templates/customTable.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomTable implements OnInit {
    private _lipsum: any;
    private _start: DateTime;
    private _end: DateTime;
    private _isSorting: bool = false;
    
    public filteredData: Array<any>;
    public filteredDataObservable: Observable<Array<any>>;
    @Input() options: CustomTableOptions;
    @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();
    
    constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef, private dataSvc: DataService) {
        declare var LoremIpsum: any;
        this._lipsum = new LoremIpsum();
    }
    
    isSorting(name: string) {
      return this.options.config.sortBy !== name && name !== '';
    };
    
    isSortAsc(name: string) {
      var isSortAsc: bool = this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
      return isSortAsc;
    };
    
    isSortDesc(name: string) {
      var isSortDesc: bool = this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
      return isSortDesc;
    };
        
    sortHeaderClick(headerName: string) {
      if (headerName) {
        if (this.options.config.sortBy === headerName) {
          this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
        }
        this.options.config.sortBy = headerName;
        this.sortChange.emit();
      }
    }
    
    getCellValue(row: any, column: CustomTableColumnDefinition) :string {
      if (column.isComputed) {
        let evalfunc = new Function ('r', 'return ' + column.binding);
        let evalresult:string = evalfunc(row);
        return evalresult;
      } else {
        return column.binding.split('.').reduce((prev:any, curr:string) => prev[curr], row);
      }
    }
    
    ngOnInit() {
      this._subscription = this.options.records.subscribe(res => { 
        this.filteredDataObservable = Observable.of(res); 
        this.filteredData = res;
        this.changeRef.markForCheck();
        //this.zone = new NgZone({enableLongStackTrace: false});
        //this.zone.run(() => {
        //  console.log('Received table data');
        //});
      });
    }
}
