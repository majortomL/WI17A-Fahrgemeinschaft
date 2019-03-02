import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MessageInterface} from './messageInterface'
import {RTDBService} from "../services/rtdb.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    test = "YO";
    message : MessageInterface;
    temp : Array<string> = ["","",""];

    constructor(public router: Router,
                private http: HttpClient,
                private rtdb: RTDBService) {
        this.message = {
            recieverUID: "",
            content : "",
            creatorUID: "",
            topic: 1,
        }
        this.getMessages();
    }

    ngOnInit() {

    }

    openProfile() {
        this.router.navigate(['/profile'])
    }

   async getMessages() {
        await this.rtdb.getMessages().then((value) => {
            value.subscribe((data : string[]) => {
                this.temp = data;

            })
        })

    }

    redirectNachfrager(){
        this.router.navigate(['/nachfrager'])
    }
    redirectAnbieter(){

    }

}
