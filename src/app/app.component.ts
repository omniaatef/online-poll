import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MessagingService } from './shared/services/messaging.service';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  message;
  // voteResult;

  constructor(private messagingService: MessagingService, private authService:AuthService) { }

  ngOnInit() {
    // let user = this.authService.getUserLoggedIn(); 
    // console.log('user:', user.uid);
    

    // const userId = user.uid;
    // this.messagingService.requestPermission(userId);
    // this.messagingService.receiveMessage();
    // // this.messagingService.receiveVoteResult();
    // this.message = this.messagingService.currentMessage;
    // // this.voteResult = this.messagingService.currentVoteResult;
  }

  // ngOnInit(): void {
  //   // Your web app's Firebase configuration
  //   // var firebaseConfig = {
  //   //   apiKey: "AIzaSyBJIpqlurMDFUPnvt9R9golDCnopUpiXf8",
  //   //   authDomain: "online-poll-84371.firebaseapp.com",
  //   //   databaseURL: "https://online-poll-84371.firebaseio.com",
  //   //   projectId: "online-poll-84371",
  //   //   storageBucket: "online-poll-84371.appspot.com",
  //   //   messagingSenderId: "1016621889652",
  //   //   appId: "1:1016621889652:web:7fb6d09bb0acb348"
  //   // };
  //   // // Initialize Firebase
  //   // firebase.initializeApp(firebaseConfig);

  // }


  

}
