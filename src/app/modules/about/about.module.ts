import { NgModule } from '@angular/core';
import { AboutComponent } from './pages/about/about.component';
import { SharedModule } from 'src/app/shared';
import { AboutRoutingModule } from './about-routing.module';


@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        AboutRoutingModule,
        SharedModule
    ]
})
export class AboutModule{

}