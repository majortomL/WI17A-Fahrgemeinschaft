import {Component, OnInit, ViewChild} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {callbackify} from 'util';
import 'googlemaps'
import {HttpClient, HttpParams} from '@angular/common/http';
import DirectionsResult = google.maps.DirectionsResult;
import {Router} from "@angular/router";

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
    routeFromFB: any;
    // Für Push auf andere Seite
    // nav = new Nav();

    items = {
        key: '1',
        path: '/route',
        value: null
    };

    constructor(private http: HttpClient, private router: Router) {
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
        this.routeRend.setMap(this.map);
    }

    calcRoute(start) {
        var self = this;


        const request = {
            origin: start,
            destination: 'DHBW Mosbach',
            travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsServ.route(request, function (result, status) {
            let dist = result.routes[0].legs[0].distance;
            let dur = result.routes[0].legs[0].duration;
            self.routeRend.setDirections(result);
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

    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coords = coordinates.coords;
    }

    hide() {
        this.hideMe = false;
    }

    writeInFirebase() {
        const test = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/Database', this.items)
            .subscribe((data) => {
                console.log(data);
                console.log(this.items.value);
            });
        this.router.navigate(['/route-details'])
    }

    getFromFirebase(key) {
        let self = this;
        let getItems = {
            key: '1',
            path: '/route'
        }
        const test = this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/getRoute?path=/route&key=1').subscribe((data) => {
            self.routeFromFB = data;
        });
    }

    showRouteFromFB() {
        this.routeRend.setDirections(this.routeFromFB);
    }

    genKeyForFB(result: DirectionsResult){
        let key = result.routes[0].legs[0].start_address.toString() + new Date();
    }

    // Push auf andere Seite
    // pushToDetails(){
    //     this.nav.push('route-details')
    // }

    // geoCode(loc) {
    //     const gc = new google.maps.Geocoder();
    //     let req = {
    //         address: loc
    //     };
    //
    //     gc.geocode(req, this.displayOnMap);
    // }

    // displayOnMap(geocodingResult) {
    //     console.log(geocodingResult);
    //     this.map.setCenter(geocodingResult.results[0].geometry.location);
    // }

}
