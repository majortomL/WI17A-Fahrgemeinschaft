import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service' ;




@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    name: string = "";
    firstname: string = "";
    birthdate: string = "";
    telefonnumber: string = "";
    email: string = "";
    emailConfirmed: string = "";
    password: string = ""
    passwordConfirmed: string = "";
//check Types

  constructor(
      private myService: AuthServiceService
  ) { }

  ngOnInit() {
  }

  registrate(){
     this.myService.registrate(this.email, this.password);
  }
}
