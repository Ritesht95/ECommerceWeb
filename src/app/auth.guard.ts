import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginauthService } from './loginauth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginAuth: LoginauthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.loginAuth.getUserLoggedIn()) {
        this.router.navigate(['login']);
      }
    return this.loginAuth.getUserLoggedIn();
  }

  canActivateSU(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.loginAuth.getUserLoggedIn()) {
        this.router.navigate(['login']);
      }
    return this.loginAuth.getUserLoggedIn();
  }
}
