import { Component,Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './services/api.service';
import {Observable} from 'rxjs/Rx';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'templates/route4.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Route4Component implements OnInit {
    private _lipsum: any;
    public hasChanges: bool = true;
    
    constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef, private apiService: ApiService) {
        declare var LoremIpsum: any;
        this._lipsum = new LoremIpsum();
    }

    canDeactivate() {
      console.log("Detecting changes. Has Changes: " + this.hasChanges);
      return Observable.of(!this.hasChanges);
    }
    
    makeCall() {
      this.apiService
        .getUrl("index.html")
        .subscribe();
    }
    
    ngOnInit() {
    }
}
