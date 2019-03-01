import {Component, OnInit, ViewChild} from '@angular/core';
import {Plugins} from '@capacitor/core';
import GeocoderRequest = google.maps.GeocoderRequest;
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

const {Geolocation} = Plugins;

@Component({
    selector: 'app-nachfrager',
    templateUrl: './nachfrager.page.html',
    styleUrls: ['./nachfrager.page.scss'],
})


export class NachfragerPage implements OnInit {
    startLoc: any;
    arrivTime: any;
    map: google.maps.Map;
    coords: { latitude: number, longitude: number }
    gc = new google.maps.Geocoder();
    req: GeocoderRequest;
    marker = new google.maps.Marker();
    hideMe = true;
    startLocCoords: any;

    testvar = 'a';


    constructor(public router: Router) {
        this.getCurrentPosition()
            .then(coords => {
                this.initMap();
            });
    }

    ngOnInit() {
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: this.coords.latitude, lng: this.coords.longitude},
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        });
    }

    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coords = coordinates.coords;
    }

    lookupLocation() {
        let self = this;
        this.req = {
            address: this.startLoc
        }
        this.gc.geocode(this.req, (results, status) => {
            if (status.toString() == 'OK') {
                self.marker.setMap(null);
                self.marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                    title: results[0].address_components[0].short_name,
                });
                self.map.setCenter(results[0].geometry.location);
                self.map.setZoom(15);
                self.hideMe = false;
                self.startLocCoords=results[0].geometry.location;
                console.log(results[0].geometry.location);
            } else {
                alert('Keine Orte mit diesem Namen gefunden!')
            }
        })
    }

    toResults() {
        if (!this.arrivTime) {
            alert('Bitte Ankunftszeitpunkt eingeben!');
        } else {
            environment.nachfrager.nfTime = this.arrivTime;
            environment.nachfrager.nfLoc = this.startLocCoords;
            console.log(environment.nachfrager.nfLoc);
            //this.router.navigate(['/nachfrager-results']);
        }
    }
}
