import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { Multiselect, FilterPipe } from './multiselect.component';
import { Tristate } from './tristate.component';
import { CustomTable, CustomTableOptions, CustomTableConfig, CustomTableColumnDefinition } from './customTable.component';
import { Filter, CustomFilterPipe} from './filter.component';
import { Pager } from './pager.component';
import { AppComponent, EqualPipe } from './app.component';
import { Route1Component } from './route1.component';
import { Route2Component } from './route2.component';
import { Route3Component }  from './route3.component';
import { Route4Component }  from './route4.component';
import { APP_BASE_HREF } from '@angular/common';
import { NavigationService } from './services/navigation.service';
import { ApiService } from './services/api.service';
import { DialogService, DialogComponent } from './services/dialog.service';
import { DataService } from './services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';

import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './services/http.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, JsonpModule, HttpModule, NgbModule.forRoot(), routing], 
  declarations: [ AppComponent, Route1Component, Route2Component, Route3Component, Route4Component, DialogComponent, Multiselect, Tristate, CustomTable, Pager, Filter, CustomFilterPipe, FilterPipe, EqualPipe ],
  providers: [
    EqualPipe,
    { provide: APP_BASE_HREF, useValue : document.location.pathname },
    { provide: Http,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    NavigationService, DialogService, ApiService, DataService],
  entryComponents: [DialogComponent],
  bootstrap:    [ AppComponent ],
})

export class AppModule { }
