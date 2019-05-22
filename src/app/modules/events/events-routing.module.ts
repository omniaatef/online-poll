import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  }
];

export const EventsRoutes = RouterModule.forChild(routes);
