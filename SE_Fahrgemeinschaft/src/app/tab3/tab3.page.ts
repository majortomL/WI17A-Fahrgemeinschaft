import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NavController} from "@ionic/angular";
import leaflet from 'leaflet';

declare var L: any;

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    @ViewChild('map') mapContainer: ElementRef;
    map: any;

    constructor(public navCtrl: NavController) {
    }

    ionViewDidEnter() {
        this.loadmap();
    }

    loadmap() {
        this.map = leaflet.map("map").fitWorld();
        leaflet.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 10
        }).on('locationfound', (e) => {
            let markerGroup = leaflet.featureGroup();
            let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
                alert('Marker clicked');
            })
            markerGroup.addLayer(marker);
            this.map.addLayer(markerGroup);
        })

        // L.Routing.control({
        //     waypoints: [
        //         L.latLng(57.74, 11.94),
        //         L.latLng(57.6792, 11.949)
        //     ],
        //     routeWhileDragging: true,
        //     geocoder: L.Control.Geocoder.nominatim()
        // }).addTo(this.map);
    }

        // async loadMap() {
        //
        //     let mymap = L.map('mapid').setView([51.505, -0.09], 13);
        //
        //     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        //         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        //         maxZoom: 18,
        //         id: 'mapbox.streets',
        //         accessToken: 'your.mapbox.access.token'
        //     }).addTo(mymap);
        // }

        ngOnInit()
        {
        }

    }
