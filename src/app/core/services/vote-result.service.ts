import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventForm } from '../models/event-form.model';

import 'rxjs/Rx';
import { VotingCounterModel } from '../models/voting-counter.model';
import { debug } from 'util';
import { fcmTokenModel } from '../models/fcm-token.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class VoteResultService {

    
    voteResult: VotingCounterModel[] = [];

    latestVoteResult;

    voteResultRecieved: Observable<{}>;

    fcmTokens:fcmTokenModel[]=[];

    constructor(private http : HttpClient){}


    setVoteResult(voteResult: VotingCounterModel){
        
            // /** Get tokens that saved */

            this.getFcmTokens().subscribe(
              res=>{
                if(res){
                  this.fcmTokens = [];
                  res.forEach(element => {
                    this.fcmTokens.push(element[1]);
                  });
                }
              },
              err=>{},
              ()=>{}
            );

        this.getVoteResult().subscribe(
            (res)=>{
                if(res){
                this.voteResult = res;

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
                              
                          },
                          (err)=>{},
                          ()=>{
                                this.latestVoteResult = this.getCurrentVoteResult();

                                this.fcmTokens.forEach(token => {
                                
                                this.sendNotifications(token).subscribe();
                                });
                          }
                      );
                }else{
                    this.voteResult.push(voteResult);
                    this.storeVoteResult(this.voteResult).subscribe();
                }
            },
            (err)=>{
            },
            ()=>{
                console.log('inside complete - get vote result01');
                
            }
        );
    }


    getCurrentVoteResult(){
        this.getVoteResult().subscribe(
            (res)=>{
                this.voteResult = res;
            }
        );
        return this.voteResult;
    }


    storeVoteResult(voteResult: VotingCounterModel[]){
        return this.http.put('https://online-poll-84371.firebaseio.com/VoteResult.json',voteResult);
    }

    getVoteResult(){
        return this.http.get<VotingCounterModel[]>('https://online-poll-84371.firebaseio.com/VoteResult.json');
    }

    sendNotifications(token){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAA7LNi-HQ:APA91bHBpqq-lDu_kID2V5_RcsZYicB2nGfWmeX9DzQ3K6d19Mhhc_HPFwgk06vKHMpG83lE7ZraY0nAdTFol9ranZfZKv4s1fOh4BNj-UK9Jvb3FUsmL68OmltZiLfN5SmfISjQ4Vo0'
         });
        let options = { headers: headers };
        
        return this.http.post('https://fcm.googleapis.com/fcm/send',
                { 
                "notification":
                                {
                                "title": "Online Poll", 
                                "body": "Please check New Voting Results"
                                },
                "to" : token
            }
            ,options);
    }

    getFcmTokens(){
        debugger;
        return this.http.get<fcmTokenModel[]>('https://online-poll-84371.firebaseio.com/fcmTokens.json')
        .map(
            (fcmTokenData)=>{
              const fcmTokenEntries = Object.entries(fcmTokenData)
                return fcmTokenEntries
            }
          )
    }


}
