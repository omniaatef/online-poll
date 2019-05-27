import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'create-event',
        component: CreateEventComponent
      },
    ]
  }
];

export const EventsRoutes = RouterModule.forChild(routes);
