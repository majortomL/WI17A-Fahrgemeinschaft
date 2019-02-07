import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthTestGuard implements CanActivate {

    constructor(private router: Router,
    public jwtHelper: JwtHelperService
){

    }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

        const loggedIn = true; //Test whether User is logged In

      if (!loggedIn) {
          this.router.navigate(['/']);
      }

      return loggedIn;

  }
}
