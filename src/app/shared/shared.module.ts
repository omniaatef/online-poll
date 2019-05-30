import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { MaterialModule } from './material.module';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { EventsModule } from '../modules/events/events.module';
import { EventListComponent } from './components/event-list/event-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
      SpinnerComponent,
      EventListComponent
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,

      // MaterialModule,

      SpinnerComponent,
      EventListComponent
    ]
})
export class SharedModule { }
