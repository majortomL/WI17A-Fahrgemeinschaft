import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})

export class CreateRideService {

    constructor(public fdb: AngularFireDatabase) {

    }

    async CreateRide(Fahrgemeinschaft) {           // AP = Apholpunkt AZ = Anzahl der Sitzplätze

        this.fdb.list('/myitems/').push(Fahrgemeinschaft);
    }


}
