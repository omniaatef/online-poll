import { NgModule} from '@angular/core';


import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

@NgModule({
    imports: [
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
    ]
})
export class CoreModule {

}
