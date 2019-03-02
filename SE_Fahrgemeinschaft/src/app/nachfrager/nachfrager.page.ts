import {Component, OnInit} from '@angular/core';
import {RTDBService} from '../services/rtdb.service';
import {LoadingController, PopoverController, ToastController} from '@ionic/angular';
import {PopOverRidesComponent} from '../component/popOverRides/popOverRides.component'
import {Router} from "@angular/router";

//test for Map
import {Platform} from '@ionic/angular'
import {
    GoogleMaps,
    GoogleMap,
    Environment
} from "@ionic-native/google-maps/ngx";
import {blue} from "@angular-devkit/core/src/terminal";

@Component({
    selector: 'app-nachfrager',
    templateUrl: './nachfrager.page.html',
    styleUrls: ['./nachfrager.page.scss'],
})
export class NachfragerPage implements OnInit {

    map: GoogleMap;


    constructor(public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                private platform: Platform) {
    }

    async ngOnInit() {
        // Since ngOnInit() is executed before `deviceready` event,
        // you have to wait the event.
        await this.platform.ready();
        await this.loadMap();
    }

    loadMap() {

        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAbn93_tFA-DuYcDUoGzVfF_siYnhAqGMM',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAbn93_tFA-DuYcDUoGzVfF_siYnhAqGMM',
        })

        this.map = GoogleMaps.create('map_canvas');

    }

    /*async onButtonClick() {
        this.map.clear();

        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });
        await this.loading.present();

        // Get the location of you
        this.map.getMyLocation().then((location: MyLocation) => {
            this.loading.dismiss();
            console.log(JSON.stringify(location, null, 2));

            // Move the map camera to the location with animation
            this.map.animateCamera({
                target: location.latLng,
                zoom: 17,
                tilt: 30
            });

            // add a marker
            let marker: Marker = this.map.addMarkerSync({
                title: '@ionic-native/google-maps plugin!',
                snippet: 'This plugin is awesome!',
                position: location.latLng,
                animation: GoogleMapsAnimation.BOUNCE
            });

            // show the infoWindow
            marker.showInfoWindow();

            // If clicked it, display the alert
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                this.showToast('clicked!');
            });
        })
            .catch(err => {
                this.loading.dismiss();
                this.showToast(err.error_message);
            });
    }*/

    /*    async showToast(message: string) {
            let toast = await this.toastCtrl.create({
                message: message,
                duration: 2000,
                position: 'middle'
            });

            toast.present();
        }*/
}