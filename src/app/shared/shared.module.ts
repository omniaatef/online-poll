import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { MaterialModule } from './material.module';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { EventsModule } from '../modules/events/events.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { VoteInterceptor } from '../core/interceptors/vote.interceptor';

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
    ],
    providers:[
      {provide: HTTP_INTERCEPTORS, useClass: VoteInterceptor, multi:true}
    ]
})
export class SharedModule { }
