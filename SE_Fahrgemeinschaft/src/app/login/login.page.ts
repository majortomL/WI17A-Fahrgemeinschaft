import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service' ;


@Component({
  selector: 'app-log-in',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {


   username: string = ""
   password: string = ""

  constructor(
    private myService: AuthServiceService
  ) {
  }

  ngOnInit() {
  }

   async logIn(){
        this.myService.logIn(this.username, this.password)
    }

}
