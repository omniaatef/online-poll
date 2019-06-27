import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MockNgModuleResolver } from '@angular/compiler/testing';


@Injectable()
export class AuthService{

    LoggedUser: string;
    errorMessage;
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
            error => this.errorMessage = error.message)
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