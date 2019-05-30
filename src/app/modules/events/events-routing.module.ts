import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'event-details/:id',
        component: EventDetailsComponent
      },
      {
        path: 'create-event',
        component: CreateEventComponent
      },
    ]
  }

];

export const EventsRoutes = RouterModule.forChild(routes);
