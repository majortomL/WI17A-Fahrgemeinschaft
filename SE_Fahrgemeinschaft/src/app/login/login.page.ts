import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth.service' ;
import { Router } from '@angular/router'
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";


@Component({
  selector: 'app-log-in',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {


   username: string = ""
   password: string = ""

  constructor(
    private myService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
  }

   async logIn(){
        this.myService.logIn(this.username, this.password)
    }

    checkLoggedIn(){
       this.myService.checkLoggedIn();
    }

    logOut(){
       this.myService.logOut();
    }
    redirectRegistration(){
       this.router.navigate(['/registration'])
    }

    /*ToDo
    * 1. An der richtigen Stelle machen, vllt. Service oder iregendwo anders
    * 2. Respone handlen
    * 3. mit Variablen arbeiten
    * 4. get/post/delete implementieren
    * 5. Das Observable Ding funktionieren lassen
    * */

    hierklickenfuerBackend() {
        let test = this.http.get('https://us-central1-db-test-fahrgemeinschaft.cloudfunctions.net/Database', {
                params: new HttpParams().append('path', '/User/Rn257ENxyeWG7Hb4X7FufKnAwG23').append('key', '/telefon')
            }
        ).subscribe(function (value) {
            console.log(value);
        })
    }


}
