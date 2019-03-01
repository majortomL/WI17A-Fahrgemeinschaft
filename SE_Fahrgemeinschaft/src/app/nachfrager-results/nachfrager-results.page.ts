import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from '@angular/common/http';
import {Plugins} from "@capacitor/core";

const {Geolocation} = Plugins;

@Component({
    selector: 'app-nachfrager-results',
    templateUrl: './nachfrager-results.page.html',
    styleUrls: ['./nachfrager-results.page.scss'],
})
export class NachfragerResultsPage {
    startLoc: any;
    arrivTime: any;
    routeFromFB: google.maps.DirectionsResult;
    routeRend = new google.maps.DirectionsRenderer();
    map: google.maps.Map;
    coords: { latitude: number, longitude: number };
    directionsServ = new google.maps.DirectionsService();
    wp: google.maps.DirectionsWaypoint;

    newRouteStart: any;

    constructor(private http: HttpClient) {
        this.arrivTime = environment.nachfrager.nfTime;
        this.startLoc = environment.nachfrager.nfLoc;

        console.log(this.startLoc);

        this.getFromFirebase();
    }

    ionViewDidEnter(){
        this.getCurrentPosition()
            .then(coords => {
                this.initMap();
            });
    }

    loadMapAll(){
        this.getCurrentPosition()
            .then(coords => {
                this.initMap();
            });
    }

    searchRoute() {
        console.log(this.startLoc);
        this.wp.location=this.startLoc
        this.newRouteStart=this.routeFromFB.routes[0].legs[0].start_address;

        var self = this;
        const request = {
            origin: this.newRouteStart,
            via_waypoints: [{location: self.startLoc}],
            destination: 'DHBW Mosbach',
            travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsServ.route(request, function (result, status) {
            let dist = result.routes[0].legs[0].distance;
            let dur = result.routes[0].legs[0].duration;
            self.routeRend.setDirections(result);
        });
    }

    getFromFirebase() {
        let self = this;
        let getItems = {
            key: '1',
            path: '/route'
        }
        const test = this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/getRoute?path=/route&key=1').subscribe((data: google.maps.DirectionsResult) => {
            self.routeFromFB = data;
            console.log(self.routeFromFB)
        });
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: this.coords.latitude, lng: this.coords.longitude},
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        });
        this.routeRend.setMap(this.map);
    }

    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coords = coordinates.coords;
    }
}
