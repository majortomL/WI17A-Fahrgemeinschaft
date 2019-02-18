import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from 'src/app/services/auth.service' ;
import {ToastController} from "@ionic/angular";


@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    user = {
        name: '',
        firstname: '',
        birthdate: '',
        telefonnumber: '',
        email: '',
        emailConfirmed: '',
        password: '',
        passwordConfirmed: '',
        agbIsChecked: false,
    };

//check Types

    constructor(private myService: AuthServiceService,
                private toastCtrl: ToastController,) {
    }

    ngOnInit() {

    }

    registrate() {

        console.log(this.user);
        //provide more Information in JSON above
        if (this.checkRegistrationSyntax()) {
            this.myService.registrate(this.user, this.user.password);
        }

    }

    checkRegistrationSyntax() {

        /*Check for:
        * empty fields
        * tpyes
        * matching emails
        * optionals?
        * AGBs
        * */
        //if(this.user.email == )
        return true;
    }

    async showPasswordInfo() {

        const toast = await this.toastCtrl.create({
            message: 'Passwort muss mind. 6 Ziffern lang sein',
            duration: 8000,
            showCloseButton: true,
            position: "bottom",
            closeButtonText: 'Done'
        });
        toast.present(); //is working although error

    }

    async showErrorToast(message: string) {

        const toast = await this.toastCtrl.create({
            message: message,
            duration: 8000,
            showCloseButton: true,
            position: "bottom",
            closeButtonText: 'Done'
        });
        toast.present(); //is working although error

    }
}
