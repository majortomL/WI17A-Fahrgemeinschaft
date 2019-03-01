import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  telefon:any;

  constructor(public router: Router) {
    this.telefon = '12';
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/home']);
  }


}

