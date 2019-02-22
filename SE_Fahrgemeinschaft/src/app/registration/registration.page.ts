import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth.service' ;
import { Router} from "@angular/router";
import { ToastController} from "@ionic/angular";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    showOptionals = false;


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
      private myService: AuthServiceService,
      private router: Router,
      private toast: ToastController,
  ) { }

  ngOnInit() {
  }

  /*ToDo:
  * Check Inputs
  * Buttons im Footer anordnen
  * Icons und Checkbox auf eine Linie
  * AGBs anzeigen
  * Optionals nur mitsenden falls eingegeben
  * */


  registrate(){
   var  user = {
            firstName: this.firstname,
            name: this.name,
            birthdate: this.birthdate,
           // telefon: this.telefonnumber, //optional
            email: this.email,
   }
    //provide more Information in JSON above
   this.myService.registrate( user ,  this.password );
  }

    redirectLogIn(){
      this.router.navigate(['/login'])
    }

    async showPasswordInfo(){
        const toast = await this.toast.create({
            message: 'Passwort muss mind. 6 Ziffern lang sein',
            duration: 8000,
            showCloseButton: true,
            position: "bottom",
            closeButtonText: 'Done'
        });
        toast.present(); //is working although error
    }


    async showOptionalInfo(){
        const toast = await this.toast.create({
            message: 'Optionale Parameter sind nicht verpflichtend zur Anmeldung. Werden aber spätestens beim Buchen oder Anbieten von Mitfahrgelegenheiten benötigt. Sie können später im Profil ergänzt werden.',
            duration: 8000,
            showCloseButton: true,
            position: "bottom",
            closeButtonText: 'Done'
        });
        toast.present(); //is working although error
    }

    dropDownOptionals(){
        if(this.showOptionals == true){
            this.showOptionals = false;
        } else{
            this.showOptionals = true
        }

    }
}
