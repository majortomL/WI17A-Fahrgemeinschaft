import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';
import {AuthServiceService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthTestGuard implements CanActivate {


    constructor(private router: Router,
                private authService: AuthServiceService,
                private afAuth: AngularFireAuth)
                 {

    }


    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (this.afAuth.auth.currentUser.uid) { //AuthServiceService.userID ||
            return true;
        }

        console.log("Access denied")
        this.router.navigate(['/login']);
        return false

    }
}
