import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service' ;



@Component({
  selector: 'app-log-in',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {

    todo = {
        email: '',
        password: ''
    };

  constructor(
    private myService: AuthServiceService //<--- Fehler!

  ) {


  };

  ngOnInit() {
  };

  logIn(){
      console.log(this.todo.email)
  //  this.myService.doRegister(this.todo.email, this.todo.password) //<--- Kann ich deshalb nicht machen
  };
}
