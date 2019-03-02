import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MessageInterface} from './messageInterface'
import {RTDBService} from "../services/rtdb.service";
import {PopOverMessageComponent} from "../component/popOverMessage/popOverMessage.component";
import { PopoverController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    test = "YO";
    message : MessageInterface;
    temp : MessageInterface[] ;

    constructor(public router: Router,
                private http: HttpClient,
                private rtdb: RTDBService,
                private popOverCtrl: PopoverController) {
        this.message = {
            recieverUID: "",
            content : "",
            creatorUID: "",
            topic: 1,
            date: "",
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
            value.subscribe((data : MessageInterface[]) => {
                this.temp = data;

            })
        })

    }

    redirectNachfrager(){
        this.router.navigate(['/nachfrager'])
    }
    redirectAnbieter(){

    }

    clickMessage(CreatorUID: string, RideID: string){
        console.log("geht")
        this.presentPopover(CreatorUID, RideID);
    }

    async presentPopover(CreatorUID: string, RideID: string) {
        const popover = await this.popOverCtrl.create({
            component: PopOverMessageComponent,
            translucent: true,
            componentProps: {
                "CreatorUID" : CreatorUID,
                "RideID": RideID
            }

        });
        popover.onDidDismiss().then((dataReturned) => {

        })
        return await popover.present();
    }

}
