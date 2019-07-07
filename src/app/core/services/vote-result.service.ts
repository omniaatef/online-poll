import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventForm } from '../models/event-form.model';

import 'rxjs/Rx';
import { VotingCounterModel } from '../models/voting-counter.model';
import { debug } from 'util';
import { fcmTokenModel } from '../models/fcm-token.model';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class VoteResultService {

    
    voteResult: VotingCounterModel[] = [];

    constructor(
                private http : HttpClient,
                private db: AngularFireDatabase
        ){}


    async setResult(voteResult: VotingCounterModel, eventIndex) {
          return this.db.object(`voteResultData/${eventIndex}`).update({voteResult});
      }


    getResult(eventIndex: number) {
        return this.db.object(`voteResultData/${eventIndex}`).valueChanges();

      }
}
