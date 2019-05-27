import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

    constructor(private router: Router){}

    registerUser(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
           success => {
            this.router.navigate(['/auth/login']);
            console.log('success register', success);
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
                this.router.navigate(['/dashboard/home']);
                console.log("success login", success)
        }
        )
        .catch(
            error => console.log("error login", error)
            
        )
    }
}