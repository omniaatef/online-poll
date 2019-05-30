import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule'
  },
  {
    path: 'dashboard',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'events',
    loadChildren: './modules/events/events.module#EventsModule'
  },

];
