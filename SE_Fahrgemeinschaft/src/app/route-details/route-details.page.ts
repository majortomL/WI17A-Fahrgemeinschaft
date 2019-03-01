import { Component, OnInit } from '@angular/core';
import {NavParams} from "@ionic/angular";
// import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-route-details',
    templateUrl: './route-details.page.html',
    styleUrls: ['./route-details.page.scss'],
})
export class RouteDetailsPage implements OnInit {
    route: any;
    constructor() {
        // this.route=navParams.get('data');
    }

    ngOnInit() {
    }

}
