import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth";
import { RTDBService } from './rtdb.service'
import { Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
      private afAuth: AngularFireAuth,
      private db: RTDBService,
      private router: Router,
  ){

  }



  async logIn(username, password){

      try {
          const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)

          console.log(res.user.getIdToken());
          //if successful --> LATER: check response status Code
          this.router.navigate(['/home'])

      } catch (err){
          console.log(err)
      }



  }

    async registrate(userJSON, password){
        var loggedIn = false;
        try {
            const res = await this.afAuth.auth.createUserWithEmailAndPassword(userJSON.email, password)
                if(res.user){
                    this.db.write(userJSON, '/User/'+res.user.uid) //write DB
                    //if successful --> LATER: check response status Code
                    this.router.navigate(['/login'])
                } else {
                    console.log("something went wrong")
                }
        } catch (err){
            console.log(err)
        }

    }

    checkLoggedIn(){
        //onAuthChanged ???
    }



}
