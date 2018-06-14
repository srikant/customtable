import {Component,Input,Output,OnInit,DoChange,ViewChild,EventEmitter,ChangeDetectionStrategy, ChangeDetectorRef, Renderer, ElementRef, forwardRef} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'tri-state-checkbox',
    template: `<input #theCheckbox type="checkbox" [(ngModel)]="topLevel" (change)="topLevelChange()">`
})

export class Tristate implements AfterViewInit, DoChange  {
  public topLevel: bool = false;
  public _items: Array<any>;
  private _subscription: Subscription;
  @Input() items: Observable<any[]>;
  @ViewChild("theCheckbox") checkbox;
  
  constructor(private _changeDetectorRef: ChangeDetectorRef) { }
    
  private setState() {
    if (!this._items) return;
    var count: int = 0;
    for (var i: int = 0; i < this._items.length; i++) {
      count += this._items[i].isSelected ? 1 : 0;
    }
    this.topLevel = (count === 0) ? false : true;
    if (count > 0 && count< i) {
      console.log("Setting indeterminate.");
      this.checkbox.nativeElement.indeterminate = true;
    } else {
      console.log("Removing indeterminate.");
      this.checkbox.nativeElement.indeterminate = false;
    }
  }
  
  ngDoCheck() {
    this.setState();
  }
  
  public topLevelChange() {
    console.log("Clicked. " + this.topLevel);
    for (var i: int = 0; i < this._items.length; i++) {
      this._items[i].isSelected = this.topLevel;
    }
  }
  
  ngOnInit() { }
  
  ngAfterViewInit() {
    this._subscription = this.items.subscribe(res => {
      console.log("Subscription triggered.");
      this._items = res;
      this.setState();
      this._changeDetectorRef.detectChanges();
    });
  }
}

