import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthServiceService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RTDBService {

  constructor(
      private db: AngularFireDatabase,
      private http: HttpClient
  ) { }

    write(myInput, path){
        const itemref = this.db.object(path);
        itemref.set(myInput);
    }

    getProfile()
    {
      const getProfile = (this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/getProfile', {
            params: new HttpParams().append('UID', environment.UID)

          }
      ) .subscribe((data) => {
        console.log(data);
      }));

    }

    updateProfile(req)
    {
            const test = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/Database', req)
          .subscribe((data) => {
           // console.log(data);
          });
    }

    deleteProfile()
    {
      //  tba.
    }
}
