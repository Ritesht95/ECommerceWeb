import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginauthService } from '../loginauth.service';


@Injectable({
  providedIn: 'root'
})

export class SuperAdminService {
  constructor(private _http: Http, private userSession: LoginauthService) {}

  checkLogin(username: string, password: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });

    const data: object = { username: username, password: password };

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/CheckLogin.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { 'oldpassword': oldPassword, 'newpassword': newPassword, 'AdminId' : this.userSession.getUserID() };

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/ChangePassword.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  forgotPassword(Username: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { 'username': Username };

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/ForgetPassword.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  checkRandomString(RandomString: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { 'rand': RandomString };

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/CheckRandomString.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  resetPassword(Username: string, VerificationCode: string, NewPassword: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { 'username': Username, 'verificationcode': VerificationCode, 'newpassword': NewPassword};

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/ResetPassword.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }
}
