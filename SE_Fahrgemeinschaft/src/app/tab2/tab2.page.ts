import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {callbackify} from 'util';

const {Geolocation} = Plugins;

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    coords: { latitude: number, longitude: number };
    start: any;
    map: google.maps.Map;
    res: any;
    hideMe = true;
    routeRend = new google.maps.DirectionsRenderer();
    directionsServ = new google.maps.DirectionsService();

    constructor(){
        this.getCurrentPosition()
            .then(coords => {
                this.initMap();
            });
    }

    items = {
        key: '1',
        path: 'route',
        value: ''
    };

    log() {
        this.reDispRoute(this.res);
    }


    ngOnInit() {

    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: this.coords.latitude, lng: this.coords.longitude},
            streetViewControl: false,
        });
    }

    calcRoute(start) {
        var self = this;

        this.routeRend.setMap(this.map);
        const request = {
            origin: start,
            destination: 'DHBW Mosbach',
            travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsServ.route(request, function (result, status) {
            let dist = result.routes[0].legs[0].distance;
            let dur = result.routes[0].legs[0].duration;
            self.routeRend.setDirections(result);
            let string = JSON.stringify(result);
            self.res = string;
        });
    }

    reDispRoute(string) {
        let route;

        this.routeRend.setMap(this.map);

        route = JSON.parse(string);
        this.routeRend.setDirections(route);

        console.log(route.routes[0].legs[0].distance);
        console.log(route.routes[0].legs[0].duration);
    }

    // geoCode(loc) {
    //     const gc = new google.maps.Geocoder();
    //     let req = {
    //         address: loc
    //     };
    //
    //     gc.geocode(req, this.displayOnMap);
    // }

    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coords = coordinates.coords;
    }

    displayOnMap(geocodingResult) {
        console.log(geocodingResult);
        this.map.setCenter(geocodingResult.results[0].geometry.location);
    }

    hide() {
        this.hideMe = false;
    }
}
