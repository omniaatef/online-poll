import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { VoteResultService } from 'src/app/core/services/vote-result.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { debug } from 'util';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  currentVoteResult = new BehaviorSubject(null);

  showLoading:boolean = false;

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private VoteResultService: VoteResultService)
     {
      this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        console.log('inside request permission');
        
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage(eventIndex) {
    debugger;
    console.log('gwa receiveMessage - index:', eventIndex);

    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        // this.currentMessage.next(payload);
    console.log('gwa receiveMessage - index1:', eventIndex);

        // this.receiveVoteResult(eventIndex);
    console.log('gwa receiveMessage - index2:', eventIndex);

        
      });
  }


  // receiveVoteResult(eventIndex) {
  //   debugger;
  //   console.log('gwa receiveVoteResult - index:', eventIndex);
    
  //   this.VoteResultService.getVoteResult().subscribe(
  //     (payload) => {
  //     debugger;
  //       console.log("new VoteResult received. ", payload);
  //       console.log("new VoteResult received. - latestVoteResult ", this.VoteResultService.getCurrentVoteResult());

        


  //       let updatedVoteResult = payload.find(element=>{
  //         if(element){
  //           return (element.eventIndex == eventIndex);
  //         }
  //       });

  //       debugger;
        
  //       console.log('**updatedVoteResult', updatedVoteResult.counter);
        
  //       this.currentVoteResult.next(updatedVoteResult.counter);
        
  //     },
  //     err=>console.log('error while getting vote result')
      
  //     )
  // }
}