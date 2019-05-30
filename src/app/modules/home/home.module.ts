import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../../shared';

// import { SharedModule } from '@app/shared';


@NgModule({
    declarations: [
        HomeComponent,

    ],
    imports: [
        SharedModule,
        HomeRoutingModule
    ],
    exports: [],
    providers: [],
    entryComponents: []
})
export class HomeModule {}
