import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private _http: Http, private userSession: LoginauthService) { }

  checkLogin(Username: string, Password: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers : headers });

    const data: object = { username: Username, password: Password };

    return (
      this._http
        .post(environment.apiURL + 'Shop/CheckLogin.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }
}
