import { Component,Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Multiselect } from './multiselect.component';
import { ApiService } from './services/api.service';
import {Observable} from 'rxjs/Rx';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'templates/route2.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Route2Component implements OnInit {
    private _lipsum: any;
    public hasChanges: bool = true;
    private _items: Array<any>;
    public items: Observable<Array<any>>;
    
    constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef, private apiService: ApiService) {
      declare var LoremIpsum: any;
      this._lipsum = new LoremIpsum();
      this._items = [];
      this.items = Observable.of(this._items);
      this.items.subscribe(res => {
        console.log("Route2 subscription triggered.");
      });
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
        this._items.push({ id: i, label: label, value: i.toString(), isSelected: true });
          console.log(label);
      }
      
      // Randomly choose a few items
      //this.randomSelect();
    }
    
    makeCall() {
      this.apiService
        .getUrl("index.html")
        .subscribe();
    }
    
    checkAll() {
      for (var i: int = 0; i < this._items.length; i++) {
        this._items[i].isSelected = true;
      }
    }
    
    uncheckAll() {
      for (var i: int = 0; i < this._items.length; i++) {
        this._items[i].isSelected = false;
      }
    }
    
    ngOnInit() {
      this.createItems();
    }
}
