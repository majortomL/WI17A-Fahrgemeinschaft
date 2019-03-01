import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RTDBService} from '../services/rtdb.service';
import {ProfileInterface} from './Profile_Interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    Profile: ProfileInterface;

//  ToDO : Ionic Waiter Components (wartekringel)


    constructor(public router: Router, private RTDBServ: RTDBService) {
        this.Profile = {
            agbIsChecked: "",
            agbIsCheckedb: "",
            birthdate: "",
            city: "",
            email: "",
            emailConfirmed: "",
            firstName: "",
            firstname: "",
            houseNumber: "",
            name: "",
            plz: "",
            street: "",
            telefonNumber: 0,
        }
        this.getProfile();

    }

    ngOnInit() {


    }

    goBack() {
        this.router.navigate(['/home']);
    }

    async getProfile() {
        await this.RTDBServ.getProfile().then((value) => {
            value.subscribe((data: ProfileInterface) => {
                this.Profile = data
            })
        })
    }

    updateProfile(){

        //console.log(this.Profile);
        this.RTDBServ.updateProfile(this.Profile);
    }


}

