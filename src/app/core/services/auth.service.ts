import * as firebase from 'firebase';

export class AuthService{
    registerUser(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
           success => console.log('success register', success)
        )
        .catch(
            error => console.log('error register', error)
        )
    }

    loginUser(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            success => console.log("success login", success)
        )
        .catch(
            error => console.log("error login", error)
            
        )
    }
}