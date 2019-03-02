import { Component, OnInit } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pop-over-rides',
  templateUrl: './popOverRides.component.html',
  styleUrls: ['./popOverRides.component.scss']
})
export class PopOverRidesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

    async Bewerben(){

     await this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/applyForSeat', {
         params: new HttpParams().append('UID', environment.UID).append('RideID', "Rn257ENxyeWG7Hb4X7FufKnAwG23MosbachHeilbronn14")
     }).subscribe((data)=>{
         console.log(data);
     });
      console.log("Bewerben klappt!")
    }

}
