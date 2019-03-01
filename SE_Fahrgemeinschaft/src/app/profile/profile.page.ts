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

  constructor(public router: Router, private RTDBServ: RTDBService)
  {
        //this.Profile= this.getProfile();
        console.log(this.Profile);
  }

  ngOnInit()
  {



  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getProfile()
  {
        return this.RTDBServ.getProfile().then((value)=> {
            value.subscribe((data) => {console.log(data)})
  });
  }

}

