import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {Geolocation} from "@ionic-native/geolocation";



declare var google;

@Component({
    selector: 'google-maps',
    templateUrl: './google-maps.page.html',
})
export class GoogleMapsPage implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    apiKey: any = 'AIzaSyCmRDcPvY-MhNWpNlOnyYZwShDimUQumhM';

    constructor() { }

    ngOnInit() {
    }

}


