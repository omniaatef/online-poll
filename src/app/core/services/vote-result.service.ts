import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventForm } from '../models/event-form.model';

import 'rxjs/Rx';
import { VotingCounterModel } from '../models/voting-counter.model';
import { debug } from 'util';

@Injectable()
export class VoteResultService {

    
    voteResult: VotingCounterModel[] = [];

    latestVoteResult;

    constructor(private http : HttpClient){}


    setVoteResult(voteResult: VotingCounterModel){
        debugger;
        this.getVoteResult().subscribe(
            (res)=>{
                debugger;
                console.log('res:', res);
                
                this.voteResult = res;

                if(this.voteResult){
                    
                    var eventItem = this.voteResult.find(
                        function(eventEl) {
                        if(eventEl){
                            return eventEl['eventIndex'] == voteResult.eventIndex;
                        }
                    }
                    );
            
                      if(eventItem){
                        eventItem.counter = voteResult.counter; 
                      }
                      else{
                        this.voteResult.push(voteResult);
                      }

                      this.storeVoteResult(this.voteResult).subscribe(
                          (success)=>{
                              console.log('inside success vote store');
                            //   alert('');
                              
                          },
                          (err)=>{},
                          ()=>{
                              console.log('inside complete vote store');
                              this.latestVoteResult = this.getCurrentVoteResult();
                              
                              
                          }
                      );
                }

            },
            (err)=>{},
            ()=>{
                debugger;
                console.log('completed..!');
                
            }
        );
    }


    getCurrentVoteResult(){
        this.getVoteResult().subscribe(
            (res)=>{
                debugger;
                this.voteResult = res;

            }
        );
        return this.voteResult;
    }


    storeVoteResult(voteResult: VotingCounterModel[]){
        debugger;
        console.log('inside store VoteResult', voteResult);
        return this.http.put('https://online-poll-84371.firebaseio.com/VoteResult.json',voteResult);
    }


    getVoteResult(){
        debugger;
        return this.http.get<VotingCounterModel[]>('https://online-poll-84371.firebaseio.com/VoteResult.json');
            // .map(
            //     (eventsData)=>{
            //       console.log('inside map - vote result',eventsData);
            //       const eventEntries = Object.entries(eventsData);
            //         console.log('VoteResult - vote result',eventEntries);
            //         return eventEntries;

            //     }
            //   )
    }


}
