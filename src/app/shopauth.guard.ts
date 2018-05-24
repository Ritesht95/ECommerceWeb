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
    if (this.loginAuth.getSUserLoggedIn()) {
      this.loginAuth.setValues(
        +localStorage.getItem('sessionShopUserID'),
        localStorage.getItem('sessionShopEmail'),
        localStorage.getItem('sessionShopUserType'),
        localStorage.getItem('sessionShopName')
      );
      return true;
    } else {
      // return this.loginAuth
        // .getServerLoggedIn(this.loginAuth.getSUserID(), 'seller')
        // .pipe(
        //   map(
        //     // tslint:disable-next-line:arrow-return-shorthand
        //     res => {
        //       if (res.json()['key'] === 'true') {
        //         this.loginAuth.setValues(
        //           res.json()['ShopID'],
        //           res.json()['Email'],
        //           'seller',
        //           res.json()['ShopName']
        //         );
        //         console.log('server login true');
        //         return true;
        //       } else {
        //         console.log('server login false');
        //         this.router.navigate(['login']);
        //         return false;
        //       }
        //     }
        //   )
        // );
      this.router.navigate(['login']);
      return false;
    }
  }
}
