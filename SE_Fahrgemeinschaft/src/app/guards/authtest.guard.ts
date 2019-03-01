import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthServiceService} from "../services/auth.service";

import {MapOperator} from "rxjs/internal/operators/map";
import {map} from "rxjs/operators";
import {of} from "rxjs/index";

@Injectable({
    providedIn: 'root'
})
export class AuthTestGuard implements CanActivate {


    constructor(private router: Router,
                private authService: AuthServiceService) {

    }


    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (AuthServiceService.userID) {
            return true;
        }

        console.log("Access denied")
        this.router.navigate(['/login']);
        return false

    }
}
