import { Component } from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    async route(){
        let request = new XMLHttpRequest();

        request.open('GET',
            'https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf62489ad19279c1d74fc3a321e1d03e42eee1&coordinates=8.34234,48.23424%7C8.34423,48.26424&profile=driving-car');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
            }
        };

        request.send();}
}
