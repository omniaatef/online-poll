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


    // setVoteResult(voteResult: VotingCounterModel){
        
    //     this.getVoteResult().subscribe(
    //         (res)=>{
    //             //in case of there's result in database & return with success
    //             if(res){
    //             this.voteResult = res;

    //                 // check if that event index exist in database
    //                 var eventItem = this.voteResult.find(
    //                     function(eventEl) {
    //                     if(eventEl){
    //                         return eventEl['eventIndex'] == voteResult.eventIndex;
    //                     }
    //                 }
    //                 );
                       
    //                 // in case that event index exist in database
    //                 // ToDO: update the current value
    //                 if(eventItem){
    //                 eventItem.counter = voteResult.counter; 
    //                 }
                        
    //                 // in case that event new to database
    //                 // ToDO: adding this result to database
    //                 else{
    //                 this.voteResult.push(voteResult);
    //                 }

    //                 this.storeVoteResult(this.voteResult).subscribe(); // Store in database
    //             }
    //             // in case of there's Not result in database or it's the first time to save & return with success
    //             else{
    //                 this.voteResult.push(voteResult);
    //                 this.storeVoteResult(this.voteResult).subscribe(); // Store in database
    //             }
    //         },

    //     );
    // }


    /**update vote result in database */
    // storeVoteResult(voteResult: VotingCounterModel[]){
    //     return this.http.post('https://online-poll-84371.firebaseio.com/VoteResult.json',voteResult);
    // }

    /**get vote result from database */
    // getVoteResult(){
    //     return this.http.get<VotingCounterModel[]>('https://online-poll-84371.firebaseio.com/VoteResult.json');
    // }

    async setResult(voteResult: VotingCounterModel, eventIndex) {
          return this.db.object(`Vote-Result/${eventIndex}`).update({voteResult});
        
      }


    getResult(eventIndex: number) {
        debugger;

                return this.db.object(`Vote-Result/${eventIndex}`).valueChanges();

      }
}
