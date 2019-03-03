import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {RTDBService} from './rtdb.service'
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {PopoverController} from "@ionic/angular";
import {AgbComponent} from '../component/agb/agb.component'
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    static userID: string = null;

    constructor(private afAuth: AngularFireAuth,
                private db: RTDBService,
                private router: Router,
                private toast: ToastController,
                private popOver: PopoverController,) {

        this.afAuth.authState.subscribe((user) => {
            if (user) {
                AuthServiceService.userID = user.uid
            } else {
                AuthServiceService.userID = null;
            }
        })

    };

    async logIn(username, password) {
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
            if (res.user) {
                /*Be
                * checking wether somebody is logged in isn't working as expected
                * */
                //environment.UID = res.user.uid;
                //environment.loggedIn = "true";
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

                const toast = await this.toast.create({
                    message: 'Registrierung fehlgeschlagen',
                    duration: 8000,
                    showCloseButton: true,
                    position: "bottom",
                    closeButtonText: 'Done'
                });
                toast.present();
            }
        } catch (err) {
            console.log(err)
        }
    }

    async logOut() {
        this.afAuth.auth.signOut()
            .then((data) => {
                //check if done and then : (isn't working as expected)
                //environment.loggedIn = "false";
                //environment.UID = "";
            })
            .catch((err) => {

            });
        this.router.navigate(['/login'])
        const toast = await this.toast.create({
            message: 'Sie wurden ausgeloggt',
            duration: 8000,
            showCloseButton: true,
            position: "bottom",
            closeButtonText: 'Done'
        });
        toast.present(); //is working although error

    }

    checkLoggedIn() {
        //console.log(this.afAuth.auth.currentUser.uid); //works both
        console.log("User from Firebase:" + AuthServiceService.userID);
        console.log("Stats from Environment: loggedIn?: " + environment.loggedIn + "UID: " + environment.UID)
    }

    getUID(){
        return AuthServiceService.userID;
    }

    getToken(){
        return this.afAuth.auth.currentUser.getIdToken();
    }

    async presentAgb() {
        const popover = await this.popOver.create({
            component: AgbComponent,
            translucent: true
        });
        return await popover.present();
    }

}
