import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-openrouteservice',
    templateUrl: './openrouteservice.page.html',
    styleUrls: ['./openrouteservice.page.scss'],
})
export class OpenrouteservicePage implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    async nav() {
        let request = new XMLHttpRequest();

        request.open('GET', 'https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf62489ad19279c1d74fc3a321e1d03e' +
            '42eee1&coordinates=9.136942,49.066121%7C9.138201,49.066716&profile=driving-car&format=geojson');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
            }
        };

        request.send();
    }

}


