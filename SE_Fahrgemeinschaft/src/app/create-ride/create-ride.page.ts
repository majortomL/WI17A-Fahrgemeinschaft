import { Component, OnInit } from '@angular/core';
import { CreateRideService } from 'src/app/create-ride.service' ;

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})

export class CreateRidePage implements OnInit {

  AHP = ""
  AZ = 0

 value : {"Fahrgemeinschaft" :
      {
  Abholpunkt: ""
  Anzahl: 0
}};



myObj = JSON.stringify(this.value);

  constructor(public myService: CreateRideService ) { }

  ngOnInit() {
  }

  CreateRide() {


       this.myService.CreateRide(this.myObj);
  }

}
