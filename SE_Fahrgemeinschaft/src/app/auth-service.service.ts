import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
      public afAuth: AngularFireAuth
  ) {

  }

    doRegister(email, password){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                   .then(res => {
                    resolve(res);
                }, err => reject(err))
        })
    }

}
