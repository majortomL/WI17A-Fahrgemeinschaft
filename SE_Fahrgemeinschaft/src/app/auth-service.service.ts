import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
      private afAuth: AngularFireAuth,
  ){

  }
  async logIn(username, password){

      try {
          const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      } catch (err){
          console.log(err)
      }
  }


}
