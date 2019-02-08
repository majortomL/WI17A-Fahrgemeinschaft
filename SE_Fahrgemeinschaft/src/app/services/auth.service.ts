import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {RTDBService} from './rtdb.service'
import {Router} from "@angular/router";
import * as firebase from "firebase/app"
import {Observable} from "rxjs/index";


@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    userID: string = null;

    constructor(private afAuth: AngularFireAuth,
                private db: RTDBService,
                private router: Router,) {

        afAuth.authState.subscribe((user) => {
            if(user){this.userID = user.uid} else {
                this.userID = null;
            }
            })
    };

    async logIn(username, password) {
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
            if(res.user){
                console.log(res.user.getIdToken());
                this.router.navigate(['/home'])
            }
        } catch (err) {
            console.log(err)
        }
    }

    async registrate(userJSON, password) {
        try {
            const res = await this.afAuth.auth.createUserWithEmailAndPassword(userJSON.email, password)
            if (res.user) {
                this.db.write(userJSON, '/User/' + res.user.uid) //write DB
                //if successful --> LATER: check response status Code
                this.router.navigate(['/login'])
            } else {
                console.log("something went wrong")
            }
        } catch (err) {
            console.log(err)
        }
    }
    logOut() {
        this.afAuth.auth.signOut();
    }

    checkLoggedIn() {
       console.log(this.afAuth.auth.currentUser.uid);
       console.log(this.userID);

    }

}
