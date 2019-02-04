import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth.service' ;




@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    name: string;
    firstname: string;
    birthdate: number;
    telefonnumber: number;
    email: string;
    emailConfirmed: string;
    password: string;
    passwordConfirmed: string;
//check Types

  constructor(
      private myService: AuthServiceService
  ) { }

  ngOnInit() {
  }

  registrate(){
   var  user = {
            firstName: this.firstname,
            name: this.name,
            birthdate: this.birthdate,
            telefon: this.telefonnumber,
            email: this.email,
   }
    //provide more Information in JSON above
   this.myService.registrate( user ,  this.password );
  }
}
