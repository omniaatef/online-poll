import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService{

    token : string;

    constructor(private router: Router){}
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
                console.log("success login", success)
                this.router.navigate(['/dashboard/home']);

            }
        )
        .catch(
            error => console.log("error login", error)
            
        )
    }

    getToken(){
       return firebase.auth().currentUser.uid;
    }
}