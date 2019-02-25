import { Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public navController: NavController) {
  }

  openProfile(){
    //this.navController.pop('tab2');
  }

}
