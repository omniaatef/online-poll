import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { EventsRoutes } from './events-routing.module';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';


@NgModule({
  declarations: [EventsComponent, CreateEventComponent],
  imports: [

    EventsRoutes,
    SharedModule
  ]
})
export class EventsModule { }
