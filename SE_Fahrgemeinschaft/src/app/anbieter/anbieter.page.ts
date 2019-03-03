import {Component} from '@angular/core';
import {Plugins} from '@capacitor/core';
import 'googlemaps';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const {Geolocation} = Plugins;

@Component({
    selector: 'app-anbieter',
    templateUrl: './anbieter.page.html',
    styleUrls: ['./anbieter.page.scss']
})
export class AnbieterPage {

    // Knopf für Routen-Submit
    routeCalculated = false;

    // Map-Initialisierung
    coords: { latitude: number, longitude: number };
    map: google.maps.Map;

    // Routenberechnung
    start: any;
    routeRend = new google.maps.DirectionsRenderer();
    directionsServ = new google.maps.DirectionsService();

    // CreateRide in FireBase
    UID = environment.UID;
    arrivalDateTime = null;
    routeResult: google.maps.DirectionsResult;
    seats = null;
    startTime;
    arrivalTime;
    date;
    tolerance = null;

    // Objekt, das Attribute der Ride speichert
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
    };

    // Objekt, das als Ride in die FireBase hochgeladen wird
    itemsForRide = {
        value: null
    };

    // Objekt, das als Route in die FireBase hochgeladen wird
    itemsForRoute = {
        key: null,
        value: null,
    };

    // Abruf des aktuellen GPS-Standorts, Initialisierung der Map im Konstruktor
    constructor(private http: HttpClient) {
        this.getCurrentPosition()
            .then(coords => {
                this.initMap();
            });

    }

    // Methode, die die Map initialisiert - die Karte wird auf Stufe 15 gezoomt, auf den aktuellen GPS-Standort
    // zentriert, StreetView, die Möglichkeit des Vollbilds und die Steuerung zur Änderung des Kartentyps werden
    // deaktiviert. Das DirectionsRenderer-Objekt, welches später Routen auf der Karte anzeigt, wird auf die Map-Instanz
    // als zu verwendende Karte gesetzt.
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

    // Abruf des GPS-Standorts per Geolocation-Plugin
    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coords = coordinates.coords;
    }

    // Berechnung der Route zur DHBW Mosbach vom variablen Punkt start aus. Zunächst Formulierung eines
    // Google-Directions-DirectionsRequest-Objekts, dann Übergabe dieses Objekts an den DirectionsService, der die
    // Anfrage an den Google-Server sendet. In der Callback-Funktion Rendering der Route auf der Map, Übernahme des
    // Ergebnisses in globale Variablen routeResult und itemsForRoute zur späteren Verwendung für u.a. Datenbankupload.
    // Zuletzt Zuweisung von true auf routeCalculated, um eine der Bedinungen für das Anzeigen des Einreichen-Buttons in
    // anbieter.page.html zu erfüllen
    calcRoute(start) {
        const self = this;
        const request = {
            origin: start,
            destination: 'DHBW Mosbach',
            travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsServ.route(request, function (result) {
            self.routeRend.setDirections(result);
            self.itemsForRoute.value = result;
            self.routeResult = result;
            self.routeCalculated = true;
        });
    }

    // Upload der generierten Route in FireBase
    createRouteInFB() {
        this.itemsForRoute.key = this.ride.routeID;
        try {

            const test = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/createRoute', this.itemsForRoute)
                .subscribe((data) => {
                });
        } catch (e) {

        }
    }

    // Generierung des Ride-Objekts mit allen benötigten Attributen, Upload des generierten Ride-Objekts in FireBase
    createRideInFB() {
        this.date = this.arrivalDateTime.substring(0, 10);
        this.calcTimeDiff();
        this.arrivalTime = this.arrivalDateTime.substring(11, 13) + this.arrivalDateTime.substring(14, 16);

        this.ride.origin = this.start;
        this.ride.destination = 'Mosbach';
        this.ride.UID = this.UID;
        this.ride.seats = this.seats;
        this.ride.car = 'Auto';
        this.ride.price = '3';
        this.ride.routeID = this.genKeyForRoute();
        this.ride.startTime = this.startTime;
        this.ride.arrivalTime = this.arrivalTime;
        this.ride.date = this.date;
        this.ride.tolerance = +this.tolerance * 60;

        this.itemsForRide.value = this.ride;

        const post = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/createRide', this.ride)
            .subscribe((data) => {
            });
    }

    // Berechnung der notwendigen Startzeit, um zum eingegebenen Ankunftszeitpunkt an der DHBW Mosbach anzukommen
    calcTimeDiff() {
        this.arrivalTime = this.arrivalDateTime.substring(11, 16);
        const hours = +this.arrivalTime.substring(0, 2);
        const mins = +this.arrivalTime.substring(3, 5) + hours * 60;
        const duration = Math.round(this.routeResult.routes[0].legs[0].duration.value / 60);

        const res = mins - duration;
        const resHours = res / 60;
        const resHoursString = resHours.toString().substring(0, 2);
        const resMins = res % 60;
        const resMinsString = resMins.toString();

        this.startTime = resHoursString + ':' + resMinsString;
    }

    // Berechnung eines Keys, unter dem das Routenobjekt in der FireBase abgelegt wird
    genKeyForRoute() {
        const date = new Date();
        let key;

        const UID = this.UID;
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const startPoint = this.routeResult.routes[0].legs[0].start_address;

        key = UID + startPoint + day + month + year + hours + minutes + seconds;

        return key;
    }

    // Absenden der Route und des Ride-Objekts an die FireBase
    submitRide() {
        this.createRideInFB();
        this.createRouteInFB();
    }
}
