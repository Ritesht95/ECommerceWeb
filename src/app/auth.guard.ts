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
    if (this.loginAuth.getUserLoggedIn()) {
      this.loginAuth.setValues(
        +localStorage.getItem('sessionUserID'),
        localStorage.getItem('sessionEmail'),
        localStorage.getItem('sessionUserType'),
        localStorage.getItem('sessionName'),
      );
      return true;
    } else {
      return this.loginAuth
        .getServerLoggedIn('rk@gmail.com', 'superadmin')
        .pipe(
          map(
            // tslint:disable-next-line:arrow-return-shorthand
            res => {
              if (res.json()['key'] === 'true') {
                this.loginAuth.setValues(
                  res.json()['Adminid'],
                  res.json()['Email'],
                  'superadmin',
                  res.json()['Adminname']
                );

                return true;
              } else {
                this.router.navigate(['login']);
                return false;
              }
            }
          )
        );
      // this.router.navigate(['login']);
    }
    // return this.loginAuth.getUserLoggedIn();
  }
}
