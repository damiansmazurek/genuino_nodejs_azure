import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineComponent }      from './online/online.component';

const appRoutes: Routes = [
  {
    path: 'online',
    component: OnlineComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);