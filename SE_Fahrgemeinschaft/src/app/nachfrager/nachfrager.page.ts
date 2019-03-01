import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';

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

    constructor() {
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

    test() {
        if (!this.startLoc || !this.arrivTime) {
            alert('Bitte alle Felder ausfüllen!')
        } else {
            console.log(this.startLoc);
            console.log(this.arrivTime);
        }
        // Ankunftszeiten vergleichen mit Anbieter
        // startLoc als Waypoint setzen bei allen Anbieter-Routen
        // Falls Zeitunterschied mit Waypoint kleiner Toleranz: Fahrt als Suchergebnis anzeigen
    }

}
