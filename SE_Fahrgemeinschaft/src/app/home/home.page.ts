import { Component, OnInit } from '@angular/core';
import { AuthServiceService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private authService : AuthServiceService,
      private navCtrl: NavController,
      private router: Router
  ) { }

  ngOnInit() {
  }

  LogOut(){
        this.authService.logOut();
  }

    ionViewWillEnter(){
       if(AuthServiceService.userID == null){
           this.router.navigate(['/login'])
       }
    }
}
