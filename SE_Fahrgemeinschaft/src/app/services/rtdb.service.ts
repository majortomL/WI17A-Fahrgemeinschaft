import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";
import { HttpClient} from "@angular/common/http";
import { AuthServiceService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RTDBService {

    url: string = '';
  constructor(
      private db: AngularFireDatabase,
      private http: HttpClient,
      private AuthService: AuthServiceService,
  ) { }

    write(myInput, path){
        const itemref = this.db.object(path);
        itemref.set(myInput);
    }

    read(){
     /*   let test = this.http.get(this.url, {
            headers:  new Headers({
                'Authorization': `Bearer ${this.AuthService.getToken()}`
            })
        });*/
    }

    update(){

    }

    delete(){

    }
}
