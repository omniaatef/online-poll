import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService{

    LoggedUser: string;

    constructor(private router: Router){}

    // Set data on localStorage
    setUserLoggedIn(user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      // get data on localStorage
    getUserLoggedIn() {
        if (localStorage.getItem('user')) {

        let res = JSON.parse(localStorage.getItem('user'));
        return res;
        
        } else {
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
            this.router.navigate(['/auth/login']);
           } 
        )
        .catch(
            error => console.log('error register', error)
        )
    }

    loginUser(email:string, password:string){
        return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            success => {
                this.LoggedUser = email;
                this.router.navigate(['/dashboard/home']);

                this.setUserLoggedIn(success.user);
            }
        )
    }
    
    isLoggedin(){
        return this.LoggedUser !=null;
    }
}