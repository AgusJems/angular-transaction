import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { };
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('CanActivate called');
        let isLoggedIn = this.authService.isLoggedIn();
        if (isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

}
