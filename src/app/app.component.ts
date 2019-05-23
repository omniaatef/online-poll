import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {



  constructor(

  ) { }

  ngOnInit(): void {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBJIpqlurMDFUPnvt9R9golDCnopUpiXf8",
      authDomain: "online-poll-84371.firebaseapp.com",
      databaseURL: "https://online-poll-84371.firebaseio.com",
      projectId: "online-poll-84371",
      storageBucket: "online-poll-84371.appspot.com",
      messagingSenderId: "1016621889652",
      appId: "1:1016621889652:web:7fb6d09bb0acb348"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }

}
