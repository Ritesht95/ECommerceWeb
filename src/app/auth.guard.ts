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
import { SuperAdminService } from './services/super-admin.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginAuth: LoginauthService,
    private router: Router,
    private suservice: SuperAdminService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginAuth.getUserLoggedIn() === 'true') {
      return true;
    } else {
      if (this.loginAuth.getSUserLoggedIn() === 'true') {
        this.router.navigate(['shopdashboard']);
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
