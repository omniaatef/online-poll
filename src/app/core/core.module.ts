import { NgModule} from '@angular/core';


import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        AuthService
    ]
})
export class CoreModule {

}
