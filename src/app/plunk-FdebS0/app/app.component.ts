import { Component,Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Multiselect } from './multiselect.component';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DialogService, DialogComponent } from './services/dialog.service';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    entryComponents: [DialogComponent]
})

export class AppComponent implements OnInit {
    private _lipsum: any;
    public isMenuExpanded: bool = false;
      
    constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef,
      private route: ActivatedRoute, private router: Router, private dialogService: DialogService) {
        declare var LoremIpsum: any;
        this._lipsum = new LoremIpsum();
    }
    
    toggleMenu() {
      this.isMenuExpanded = !this.isMenuExpanded;
    }
    
    open() {
      this.dialogService.open();
    }
        
    ngOnInit() {
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          let currentRoute = this.route.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          console.log(currentRoute.snapshot.data);
        })
    }
}

@Pipe({
    name: 'equal',
    pure: false
})

export class EqualPipe implements PipeTransform {
    transform(items: any, filter: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.filter(item =>
              filterKeys.reduce((memo, keyName) => {
                  console.log("Comparing");
                  return item[keyName] === filter[keyName];}, true)
                  );
      } else {
          return items;
      }
    }
}

