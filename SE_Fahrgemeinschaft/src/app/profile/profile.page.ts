import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RTDBService} from '../services/rtdb.service';
import {ProfileInterface} from './Profile_Interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    Profile: ProfileInterface;
//  ToDO : Ionic Waiter Components (wartekringel)

  constructor(public router: Router, private RTDBServ: RTDBService)
  {

        this.getProfile();
        console.log(this.Profile);
  }

  ngOnInit()
  {



  }

  goBack() {
    this.router.navigate(['/home']);
  }

  async getProfile()
  {
      await this.RTDBServ.getProfile().then((value)=> {
            value.subscribe((data: ProfileInterface) => {
                this.Profile = data

            })
        })
      console.log(this.Profile);
  }


}

