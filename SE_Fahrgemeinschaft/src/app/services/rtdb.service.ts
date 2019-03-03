import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthServiceService} from "./auth.service";
import {environment} from "../../environments/environment";
import {ProfileInterface} from '../profile/Profile_Interface';
import {promise} from "selenium-webdriver";

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

    async getProfile()//: ProfileInterface
    {
       return await(this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/getProfile', {
             params: new HttpParams().append('UID', environment.UID)
         }));


    }

    updateProfile(req)
    {

            const test = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/updateProfile', req)
          .subscribe((data) => {
           console.log(data);
          });

    }

    async getMessages(){
        return await (this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/getMessages', {
            params: new HttpParams().append('recieverUID', environment.UID)
        }))
    }

    deleteProfile()
    {
      //  tba.
    }

    async searchRides(origin: string, endTime: string){
        return await (this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/searchRide', {
            params: new HttpParams().append('origin', origin).append('destination','Mosbach').append('endTime',endTime)
        }))
    }

    async applyRide(rideID: string){

        return await (this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/applyForSeat', {
            params: new HttpParams().append('UID', environment.UID).append('RideID',rideID)
        }))
    }
}
