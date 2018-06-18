import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginauthService } from './loginauth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ShopauthGuard implements CanActivate {
  constructor(private loginAuth: LoginauthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginAuth.getSUserLoggedIn() === 'true') {
      return true;
    } else {
      if (this.loginAuth.getUserLoggedIn() === 'true') {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
