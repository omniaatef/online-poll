import { NgModule} from '@angular/core';


import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthService } from './services/auth.service';
import { EventStorageService } from './services/event-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { VotingStorageService } from './services/voting-storage.service';
import { VoteResultService } from './services/vote-result.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        AuthService,
        EventStorageService,
        VotingStorageService,
        VoteResultService
    ]
})
export class CoreModule {

}
