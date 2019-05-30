import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { VotingStatusModel } from '../models/voting-status.model';

@Injectable()
export class VotingStorageService {

    // votePerUser : [boolean[], string];


    constructor(private http : HttpClient){

    }

    // storeVotingStatus(status: boolean[], Uid){

    //     // this.getVotingStatus();
    //     return this.http.post('https://online-poll-84371.firebaseio.com/VotingData.json',[status,Uid]);
    // }


    // getVotingStatus(){
    //     return this.http.get('https://online-poll-84371.firebaseio.com/VotingData.json')
    //         .map(
    //             (voteStatus)=>{
    //               console.log('inside map',voteStatus);
    //               const voteEntries = Object.entries(voteStatus)
    //                 console.log('eventdata',voteEntries)
    //                 return voteEntries;

    //             }
    //           )
    // }



}












    