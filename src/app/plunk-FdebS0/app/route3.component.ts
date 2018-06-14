import { Component,Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Multiselect } from './multiselect.component';
import {Observable} from 'rxjs/Rx';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { EqualPipe } from './app.component';

@Component({
    templateUrl: 'templates/route3.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Route3Component implements OnInit {
    private _lipsum: any;
    public hasChanges: bool = true;
    public items: Observable<Array<any>>;
    public selectedItems: Observable<Array<any>>;
    public _selectedItems: Array<any> = [];
    public watchedItems: Array<any>;
    private _items: Array<any>;
    
    constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {
        declare var LoremIpsum: any;
        this._lipsum = new LoremIpsum();
        this._items = [];
        this.items = Observable.of(this._items);
        this.items.subscribe(res => { console.log("Items changed"); this.watchedItems = res; });
    }

    canDeactivate() {
      console.log("Detecting changes. Has Changes: " + this.hasChanges);
      return Observable.of(!this.hasChanges);
    }
    
    createItems() {
      this._items.length = 0;
      var max: int = 20;
      var min: int = 10;
      var numItems: int = Math.floor(Math.random() * (max - min + 1)) + min; 
      console.log("Adding " + numItems.toString() + " items");
      max = 6;
      min = 3;
      var i: int;
      for (i =0; i < numItems; i++) {
        var numWords: int = Math.floor(Math.random() * (max - min + 1)) + min;
        var label: string = this._lipsum.generate(numWords); 
        this._items.push({ label: label, value: i.toString()});
          console.log(label);
      }
      
      // Randomly choose a few items
      this.randomSelect();
    }
    
    randomSelect() {
      var numItems: int = this.getRandomInt(0, this._items.length) + 1;
      var min: int = 0;
      var max: int = this._items.length - 1;
      var toSelectIndexes: Array<int> = [];
      for (var j: int = 0; j < this.getRandomInt(1, numItems); j++) {
          var randIndex: int = this.getRandomInt(min, max);
          var arrIndex = toSelectIndexes.indexOf(randIndex);
          if (arrIndex == -1) {
              toSelectIndexes.push(randIndex);
              var item: any = this._items[randIndex];
              item.checked = true;
              this._selectedItems.push(this._items[randIndex]);
          }
      }
    }
    
    getRandomInt(min: int, max: int) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
        onChange(newValue) {
        console.log('received change event');
    }
        
    
ngOnInit() {
      this.createItems();
      let timer = Observable.timer(20000,20000);
      timer.subscribe(t=> {
        //this.createItems();
      });
    }
}

