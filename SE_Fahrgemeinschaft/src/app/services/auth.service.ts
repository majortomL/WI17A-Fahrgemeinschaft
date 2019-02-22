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

    static userID: string = null;

    constructor(private afAuth: AngularFireAuth,
                private db: RTDBService,
                private router: Router,) {

        afAuth.authState.subscribe((user) => {
            if(user){AuthServiceService.userID = user.uid} else {
                AuthServiceService.userID = null;
            }
            })
    };

    async logIn(username, password) {
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
            if(res.user){
                console.log(res.user.getIdToken());
                this.router.navigate(['/'])
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
        this.router.navigate(['/login'])
    }

    checkLoggedIn() {
       //console.log(this.afAuth.auth.currentUser.uid); //works both
       console.log(AuthServiceService.userID);

    }

}
