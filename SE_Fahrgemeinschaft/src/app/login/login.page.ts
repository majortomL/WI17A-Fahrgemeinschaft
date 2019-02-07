import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth.service' ;
import { Router } from '@angular/router'


@Component({
  selector: 'app-log-in',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {


   username: string = ""
   password: string = ""

  constructor(
    private myService: AuthServiceService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

   async logIn(){
        this.myService.logIn(this.username, this.password)
    }


}
