import {Component, OnInit} from '@angular/core';
import { RTDBService } from '../services/rtdb.service';
import {LoadingController, PopoverController, ToastController} from '@ionic/angular';
import { PopOverRidesComponent } from '../component/popOverRides/popOverRides.component'
import { Router} from "@angular/router";

//test for Map
import { Platform } from '@ionic/angular'
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation,
    MyLocation
} from "@ionic-native/google-maps";

@Component({
    selector: 'app-nachfrager',
    templateUrl: './nachfrager.page.html',
    styleUrls: ['./nachfrager.page.scss'],
})
export class NachfragerPage implements OnInit {

    map:GoogleMap;
    loading: any;

    endTime: any;
    origin: any;
    rides : JSON [];
    constructor(private rtdb : RTDBService,
                private popOverCtrl: PopoverController,
                private router: Router,
                private tostCtrl : ToastController,
                private platform: Platform,
                private loadingCtrl : LoadingController
                ) {

    }

    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
    }

    loadMap() {
        this.map = GoogleMaps.create('map_canvas', {
            camera: {
                target: {
                    lat: 43.0741704,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        });

    }

    async onButtonClick() {
        this.map.clear();

        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });
        await this.loading.present();

        // Get the location of you
        this.map.getMyLocation().then((location: MyLocation) => {
            this.loading.dismiss();
            console.log(JSON.stringify(location, null ,2));

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
    }

    async showToast(message: string) {
        let toast = await this.tostCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });

        toast.present();
    }


    async search() {
        //hier Algorithmus aus NotePad implementieren

        let temp = this.endTime.split("T", 2);  //date to be added
        temp = temp[1].slice(0,5);
        await this.rtdb.searchRides(this.origin, temp).then((value) => {
            value.subscribe((data : JSON[]) => {
               this.rides = data;
            })
        })
    }

    showRide(){
        console.log("click funktioniert")
    }

    async presentPopover() {
        const popover = await this.popOverCtrl.create({
            component: PopOverRidesComponent,
            translucent: true
        });
        return await popover.present();
    }

    redirectHome(){
        this.router.navigate([''])
    }

}
