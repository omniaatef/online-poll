import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'events',
    loadChildren: './modules/events/events.module#EventsModule'
  }
];
