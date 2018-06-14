import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route1Component }  from './route1.component';
import { Route2Component }  from './route2.component';
import { Route3Component }  from './route3.component';
import { Route4Component }  from './route4.component';
import { NavigationService } from './services/navigation.service';

const appRoutes: Routes = [
    { path: '', component: Route1Component, data: { name: 'Route1' }, canDeactivate: [ NavigationService ] },
    { path: 'route2', component: Route2Component, data: { name: 'Route2' }, canDeactivate: [ NavigationService ]  },
    { path: 'route3', component: Route3Component, data: { name: 'Route3' }, canDeactivate: [ NavigationService ]  },
    { path: 'route4', component: Route4Component, data: { name: 'Route4' }, canDeactivate: [ NavigationService ]  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
