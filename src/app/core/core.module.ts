import { NgModule} from '@angular/core';


import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        AuthService,
        EventService
    ]
})
export class CoreModule {

}
