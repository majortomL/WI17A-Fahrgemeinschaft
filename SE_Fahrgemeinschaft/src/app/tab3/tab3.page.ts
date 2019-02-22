import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NavController} from "@ionic/angular";
import leaflet from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';


var start: any;
var end: any;

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
    @ViewChild('map') mapContainer: ElementRef;
    map: any;

    ngOnInit() {
    }

    constructor(public navCtrl: NavController) {
    }

    ionViewDidEnter() {
        this.loadmap();
        this.geoCoder();
    }

    loadmap() {
        this.map = leaflet.map("map").fitWorld();
        leaflet.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(this.map);
        var marker = L.marker([
            49.3539844,
            9.1513016898797
        ]);
        marker.addTo(this.map);
    }

    route() {
        let route = L.Routing.control(
            {
                waypoints: [
                    L.latLng(start),
                    L.latLng(49.3539844, 9.1513016898797),
                ],
                router: L.Routing.mapbox('pk.eyJ1IjoibWFqb3J0b21sIiwiYSI6ImNqc2E1bHlzZzFud3A0M3JuYTU1MnIxcHMifQ.RJQyiR5__e25Vd-HkhOfsg')
            }).addTo(this.map).hide();
        // Nicht funktional!
        // L.getPlan();
    }

    geoCoder() {
        let geoCoderA = new L.Control.geocoder({
            collapsed: false,
            position: "topleft",
            placeholder: "Start..."
        }).addTo(this.map);
        geoCoderA.on('markgeocode', function (e) {
            start = e.geocode.center;
            console.log(start);
        });
        // GeoCoder für variables Routenziel
        // let geoCoderB = new L.Control.geocoder({
        //     collapsed: false,
        //     position: "topleft",
        //     placeholder: "Ziel..."
        // }).addTo(this.map);
        // geoCoderB.on('markgeocode', function (f) {
        //     end = f.geocode.center;
        //     console.log(end);
        // })
    }
}
