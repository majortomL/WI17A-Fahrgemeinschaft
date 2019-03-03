import {Component, OnInit} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NavParams} from "@ionic/angular";
import {Input} from "@angular/core";
import {RTDBService} from "../../services/rtdb.service";

@Component({
    selector: 'app-pop-over-rides',
    templateUrl: './popOverRides.component.html',
    styleUrls: ['./popOverRides.component.scss']
})
export class PopOverRidesComponent implements OnInit {
    @Input() rideID: string;

    constructor(private http: HttpClient, private rtdb: RTDBService) {
    }

    ngOnInit() {
    }


    async Bewerben() {

        this.rtdb.applyRide(this.rideID)
            .then((data) => {
                data.subscribe((data) =>{
                    //do something with returned data from Apply(Backend)

                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

}
