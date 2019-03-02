import {Component, Input, OnInit} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pop-over-message',
  templateUrl: './popOverMessage.component.html',
  styleUrls: ['./popOverMessage.component.scss']
})
export class PopOverMessageComponent implements OnInit {
    @Input() CreatorUID: string;
    @Input() RideID: string;

  constructor(private http : HttpClient) { }

  ngOnInit() {
  }


    ablehnen(){

    }

    async annehmen(){
        console.log("Hier in annehmen/ Creator: " + this.CreatorUID + "Ride: "+this.RideID)
        await(this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/confirmApplicantByCreator', {
            params: new HttpParams().append('accepted', "true")
                .append("applicantUID",this.CreatorUID)
                .append("rideID",this.RideID)
                .append("UID", environment.UID)
        }));


    }
}
