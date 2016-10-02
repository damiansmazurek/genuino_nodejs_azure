import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './events/events.component'
import { OnlineComponent } from './online/online.component';
import {WorkTimeComponent} from './worktime/worktime.component'

const appRoutes: Routes = [
  {
    path: 'online',
    component: OnlineComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: '',
    component: OnlineComponent
  },
  {
    path: 'worktime',
    component: WorkTimeComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);