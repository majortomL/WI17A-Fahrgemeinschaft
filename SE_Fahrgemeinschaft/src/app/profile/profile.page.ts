import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RTDBService} from '../services/rtdb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {




  constructor(public router: Router, private RTDBServ: RTDBService)
  {

  }

  ngOnInit()
  {



  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getProfile()
  {

  }

}

