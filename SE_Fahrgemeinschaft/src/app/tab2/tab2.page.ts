import {Component} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Config} from '@ionic/angular';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

    public items: any;
    public result: any;


    constructor(private http: HttpClient) {
    }


    showHTTP() {
        const test = this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/debuggingForMarcel'
        ).subscribe((data) => {
            console.log(data.name);
        });

    }

    PostHTTP() {

        this.items =
         {
            value: '77',
            key: '/telefon',
            path: '/User/Rn257ENxyeWG7Hb4X7FufKnAwG23'

        };
        /*
               this.items.append('key', '/telefon');
               this.items.append('path', '/User/Rn257ENxyeWG7Hb4X7FufKnAwG23');
               this.items.append('value', '999');
*/
        console.log(this.items);
        const test = this.http.post('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/Database', this.items)
            .subscribe((data) => {
                console.log(data);
            });


}

}

/*
* .subscribe(function (value) {
      console.log(value);
    });
* */
