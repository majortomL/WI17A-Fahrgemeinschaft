import {Component, OnInit} from '@angular/core';
import {from as fromPromise, Observable, of} from "rxjs";
import {Capacitor, GeolocationPosition, Plugins} from "@capacitor/core";
import {AlertController, LoadingController} from "@ionic/angular";
import {switchMap, tap} from "rxjs/operators";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    public coordinates$: Observable<GeolocationPosition>;
    public defaultPos: { latitude: 42, longitude: 42 };

    constructor(public loading: LoadingController,
                public alertCtrl: AlertController) {

    }

    ngOnInit() {
        //start the loader
        this.displayLoader()
            .then((loader: any) => {
                // get position
                return this.getCurrentPosition()
                    .then(position => {
                        // close the loader + return the position
                        loader.dismiss();
                        return position;
                    })
                    // if error
                    .catch(err => {
                        // close loader + return NULL
                        loader.dismiss();
                        return null;
                    });
            });
        console.log('asdf');
    }

    async displayLoader() {
        const loading = await this.loading.create(

        );
        await loading.present;
        return loading;
    }

    private async presentAlert(message: string): Promise<HTMLIonAlertElement> {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            subHeader: 'Wadafak we are offline',
            message: message,
            buttons: ['OK']
        });
        await alert.present();
        return alert;
    }

    private async getCurrentPosition(): Promise<any> {
        const isAvailable: boolean = Capacitor.isPluginAvailable('Geolocation');
        if (!isAvailable) {
            console.log('Err: Plugin ist not available');
            return of(new Error('Err: Plugin is not available'));
        }
        const POSITION = Plugins.Geolocation.getCurrentPosition()
        // handle Capacitor Errors
            .catch(err => {
                console.log('ERR', err);
                return new Error(err.message || 'customized message');
            });
        this.coordinates$ = fromPromise(POSITION).pipe(
            switchMap((data: any) => of(data.coords)),
            tap(data => console.log(data))
        );
        return POSITION;
    }
}
