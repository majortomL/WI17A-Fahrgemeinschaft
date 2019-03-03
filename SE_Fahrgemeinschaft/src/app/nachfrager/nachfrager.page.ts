import {Component, OnInit} from '@angular/core';
import {RTDBService} from '../services/rtdb.service';
import {PopoverController} from '@ionic/angular';
import {PopOverRidesComponent} from '../component/popOverRides/popOverRides.component'
import {Router} from "@angular/router";
import {rideInterface} from "./rideInterface";

@Component({
    selector: 'app-nachfrager',
    templateUrl: './nachfrager.page.html',
    styleUrls: ['./nachfrager.page.scss'],
})
export class NachfragerPage implements OnInit {

    endTime: any;
    origin: any;
    rides: JSON[];

    constructor(private rtdb: RTDBService,
                private popOverCtrl: PopoverController,
                private router: Router) {
    }

    ngOnInit() {
    }

    async search() {
        //hier Algorithmus aus NotePad implementieren

        let temp = this.endTime.split("T", 2);  //date to be added
        temp = temp[1].slice(0, 5);
        await this.rtdb.searchRides(this.origin, temp).then((value) => {
            value.subscribe((data: JSON[]) => {
                this.rides = data;
            })
        })
    }

    async presentPopover(rideID: string, origin: string, destination: string, arrivalTime: string, startTime: string, seats: string) {
        const popover = await this.popOverCtrl.create({

            component: PopOverRidesComponent,
            translucent: true,
            componentProps: {
                "rideID": rideID,
                "origin": origin,
                "destination": destination,
                "arrivalTime": arrivalTime,
                "startTime": startTime,
                "seats": seats
                //pass here more parameters to show in PopOverRide
            }

        });
        return await popover.present();
    }

    redirectHome() {
        this.router.navigate([''])
    }

}
