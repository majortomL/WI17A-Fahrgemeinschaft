import {Component, OnInit, ViewChild} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {callbackify, types} from 'util';
import 'googlemaps'
import {HttpClient, HttpParams} from '@angular/common/http';
import DirectionsResult = google.maps.DirectionsResult;
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

const {Geolocation} = Plugins;

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    //Knopf für Routen-Submit
    routeCalculated = false;

    // Map-Initialisierung
    coords: { latitude: number, longitude: number };
    map: google.maps.Map;

    // Routenberechnung
    start: any;
    routeRend = new google.maps.DirectionsRenderer();
    directionsServ = new google.maps.DirectionsService();

    routeFromFB: any;

    // CreateRide in FireBase
    UID = environment.anbieter.UID;
    arrivalDateTime = null;
    routeResult: google.maps.DirectionsResult;
    seats = null;
    startTime;
    arrivalTime;
    date;
    tolerance = null;

    ride = {
        origin: null,
        destination: null,
        UID: null,
        seats: null,
        car: null,
        // passengers: {},
        // applicants: {},
        price: null,
        routeID: null,
        startTime: null,
        arrivalTime: null,
        date: null,
        tolerance: null
    }

    itemsForRide = {
        value: null
    }

    itemsForRoute = {
        key: null,
        value: null,
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
            zoom: 15,
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
            self.itemsForRoute.value = result;
            self.routeResult = result;
            self.routeCalculated = true;
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

    createRouteInFB() {
        this.itemsForRoute.key = this.ride.routeID;
        try {

            const test = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/createRoute', this.itemsForRoute)
                .subscribe((data) => {
                });
        } catch (e) {

        }
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

    createRideInFB() {
        this.arrivalTime = this.arrivalDateTime.substring(11, 19)
        this.date = this.arrivalDateTime.substring(0, 10)
        this.calcTimeDiff();

        this.ride.origin = this.routeResult.routes[0].legs[0].start_address;
        this.ride.destination = this.routeResult.routes[0].legs[0].end_address;
        this.ride.UID = this.UID;
        this.ride.seats = this.seats;
        this.ride.car = 'Auto';
        this.ride.price = '3';
        this.ride.routeID = this.genKeyForRoute();
        this.ride.startTime = this.startTime;
        this.ride.arrivalTime = this.arrivalTime;
        this.ride.date = this.date;
        this.ride.tolerance = this.tolerance;

        this.itemsForRide.value = this.ride

        const post = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/createRide', this.ride)
            .subscribe((data) => {
            })
    }

    calcTimeDiff() {
        this.arrivalTime = this.arrivalDateTime.substring(11, 16)
        let hours = +this.arrivalTime.substring(0, 2);
        let mins = +this.arrivalTime.substring(3, 5) + hours * 60;
        let duration = Math.round(this.routeResult.routes[0].legs[0].duration.value / 60);

        let res = mins - duration;
        let resHours = res / 60;
        let resHoursString = resHours.toString().substring(0, 2);
        let resMins = res % 60;
        let resMinsString = resMins.toString();

        let startTime = resHoursString + ':' + resMinsString;

        this.startTime = startTime;
    }

    showRouteFromFB() {
        this.routeRend.setDirections(this.routeFromFB);
    }

    genKeyForRide() {
        let date = new Date();

        let key;
        let UID = this.UID;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        key = UID + day + month + year + hours + minutes + seconds;

        return key;
    }

    genKeyForRoute() {
        let date = new Date();
        let key;

        let UID = this.UID;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let startPoint = this.routeResult.routes[0].legs[0].start_address;

        key = UID + startPoint + day + month + year + hours + minutes + seconds;

        return key;
    }

    submitRide() {
        this.createRideInFB();
        this.createRouteInFB();
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
