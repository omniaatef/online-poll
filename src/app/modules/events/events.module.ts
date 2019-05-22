import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { EventsRoutes } from './events-routing.module';
import { EventsComponent } from './pages/events/events.component';


@NgModule({
  declarations: [EventsComponent],
  imports: [
    EventsRoutes,

    SharedModule
  ]
})
export class EventsModule { }
