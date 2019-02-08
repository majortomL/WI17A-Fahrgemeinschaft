import { Component, OnInit } from '@angular/core';
import { AuthServiceService} from "../services/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private authService : AuthServiceService,
  ) { }

  ngOnInit() {
  }

  LogOut(){
        this.authService.logOut();
  }

}
