import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService{

    // token : string;
    LoggedUser: string;

    constructor(private router: Router){}

    // Set data on localStorage
    setUserLoggedIn(user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('saved on localStorage');
      }


      // get data on localStorage
    getUserLoggedIn() {
        if (localStorage.getItem('user')) {

        let res = JSON.parse(localStorage.getItem('user'));
        console.log('local storage has a value',JSON.parse(localStorage.getItem('user')));
        return res;
        
        } else {
        console.log('localStorage empty');
        }
    }

  // Optional: clear localStorage
    clearLocalStorage() {
        localStorage.clear();
      }


    registerUser(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
           success => {
            console.log('success register', success);
            this.router.navigate(['/auth/login']);
           } 
        )
        .catch(
            error => console.log('error register', error)
        )
    }


    loginUser(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            success => {
                this.LoggedUser = email;
                console.log("success login", success);
                this.router.navigate(['/dashboard/home']);
                console.log("this.LoggedUser", this.LoggedUser);

                // this.getToken();
                this.setUserLoggedIn(success.user);

            }
        )
        .catch(
            error => console.log("error login", error)
            
        )
    }

    // getToken(){
    //    firebase.auth().currentUser.getIdToken()
    //    .then(
    //     (token: string) => this.token = token
    //    );
    //    return this.token;
    // }

    isLoggedin(){
        return this.LoggedUser !=null;
    }

    // isAuthenticated() {
    //     return this.token != null;
    //   }
}