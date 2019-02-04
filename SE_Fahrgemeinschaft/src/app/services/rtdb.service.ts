import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class RTDBService {

  constructor(
      private db: AngularFireDatabase,
  ) { }

    write(myInput, path){
        const itemref = this.db.object(path);
        itemref.set(myInput);
    }

    read(){

    }

    update(){

    }

    delete(){

    }
}
